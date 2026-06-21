#!/usr/bin/env node
/**
 * resolve-channels.mjs
 * Resolves Postiz integration IDs at runtime from the stable {provider, handle}
 * pairs in the active brand's brands/<brand>/channels.json, so scripts never
 * hardcode the opaque Postiz integration ids (which rotate on reconnect).
 *
 * Active brand: BRAND env var if set, else the sole brands/<brand>/ folder
 * (ignoring the _template skeleton). One shared Postiz workspace serves all
 * brands; this filters it down to the brand's declared channels.
 *
 * Requires POSTIZ_API_KEY in the environment (pre-injected on Cloud Agent VMs).
 *
 * Usage:
 *   node scripts/resolve-channels.mjs            # prints: export IG_ID='...' (eval-friendly)
 *   eval "$(node scripts/resolve-channels.mjs)"  # load IG_ID / FB_ID / TIKTOK_ID into the shell
 *   node scripts/resolve-channels.mjs --json     # prints {"ig":"<id>", ...}
 *   node scripts/resolve-channels.mjs ig         # print a single id (raw, for $(...))
 *   BRAND=<brand> node scripts/resolve-channels.mjs   # choose brand when several exist
 */

import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BRANDS_DIR = resolve(__dirname, '../brands');

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const singleAlias = args.find((a) => !a.startsWith('-'));

function fail(msg) {
  console.error(`resolve-channels: ${msg}`);
  process.exit(1);
}

// Resolve the active brand: explicit BRAND env wins; otherwise, if exactly one
// real brand folder exists (ignoring the `_template` skeleton), use it.
function resolveBrand() {
  let entries;
  try {
    entries = readdirSync(BRANDS_DIR, { withFileTypes: true });
  } catch (err) {
    fail(`could not read ${BRANDS_DIR}: ${err.message}`);
  }
  const brands = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith('_') && !e.name.startsWith('.'))
    .map((e) => e.name);

  if (process.env.BRAND) {
    if (!brands.includes(process.env.BRAND)) {
      fail(`BRAND="${process.env.BRAND}" not found in ${BRANDS_DIR} (have: ${brands.join(', ') || 'none'}).`);
    }
    return process.env.BRAND;
  }
  if (brands.length === 1) return brands[0];
  if (brands.length === 0) fail(`no brand folders found in ${BRANDS_DIR}.`);
  fail(`multiple brands found (${brands.join(', ')}); set BRAND=<name> to choose one.`);
}

const BRAND = resolveBrand();
const CONFIG_PATH = resolve(BRANDS_DIR, BRAND, 'channels.json');

if (!process.env.POSTIZ_API_KEY) {
  fail('POSTIZ_API_KEY is not set. Cannot query Postiz integrations.');
}

let channels;
try {
  channels = JSON.parse(readFileSync(CONFIG_PATH, 'utf8')).channels;
} catch (err) {
  fail(`could not read ${CONFIG_PATH}: ${err.message}`);
}
if (!channels || typeof channels !== 'object') {
  fail(`${CONFIG_PATH} has no "channels" object.`);
}

// `postiz integrations:list` prints a human banner line before the JSON array.
let raw;
try {
  raw = execFileSync('npx', ['--no-install', 'postiz', 'integrations:list'], {
    encoding: 'utf8',
  });
} catch (err) {
  fail(`failed to run "postiz integrations:list": ${err.message}`);
}
const start = raw.indexOf('[');
if (start === -1) fail(`unexpected integrations:list output:\n${raw}`);

let integrations;
try {
  integrations = JSON.parse(raw.slice(start));
} catch (err) {
  fail(`could not parse integrations:list JSON: ${err.message}`);
}

function matchChannel({ provider, handle }) {
  const candidates = integrations.filter((i) => i.identifier === provider);
  // Prefer an exact handle match against profile, then name.
  return (
    candidates.find((i) => i.profile && i.profile === handle) ||
    candidates.find((i) => i.name === handle) ||
    // If only one channel of this provider exists, use it regardless of handle.
    (candidates.length === 1 ? candidates[0] : null)
  );
}

const resolved = {};
const missing = [];
for (const [alias, spec] of Object.entries(channels)) {
  const hit = matchChannel(spec);
  if (hit) resolved[alias] = hit.id;
  else missing.push(`${alias} (${spec.provider}/${spec.handle})`);
}

if (missing.length) {
  console.error(
    `resolve-channels: WARNING — no connected channel matched: ${missing.join(', ')}`
  );
}

if (singleAlias) {
  if (!resolved[singleAlias]) {
    fail(`alias "${singleAlias}" did not resolve to a connected channel.`);
  }
  process.stdout.write(resolved[singleAlias] + '\n');
} else if (asJson) {
  process.stdout.write(JSON.stringify(resolved, null, 2) + '\n');
} else {
  for (const [alias, id] of Object.entries(resolved)) {
    process.stdout.write(`export ${alias.toUpperCase()}_ID='${id}'\n`);
  }
}

process.exit(missing.length ? 1 : 0);
