#!/usr/bin/env node
/**
 * Math seatbelt — refuses to pass if an answer doesn't match recomputed exprs.
 * The agent still authors problems; this only blocks wrong arithmetic.
 *
 * Usage:
 *   node scripts/verify-math.mjs --expr "48*11" --expect 528
 *   node scripts/verify-math.mjs --expr "48*11" --expr "48*(10+1)" --expect 528
 *   node scripts/verify-math.mjs --qcm '{"A":0.6,"B":0.625,"C":0.62}' --correct A
 *   node scripts/verify-math.mjs --bundle brands/albert-prep/output/organic/posts/2026-06-26-qcm-001
 *
 * Optional post.md frontmatter block (agent-written):
 *   verify:
 *     answer: 528
 *     exprs: ["48*11"]
 *     qcm: { options: { A: 0.6, B: 0.625, C: 0.62 }, correct: A }
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const args = process.argv.slice(2);

function usage() {
  console.error(`Usage:
  verify-math.mjs --expr EXPR [--expr EXPR ...] --expect N
  verify-math.mjs --qcm '{"A":…,"B":…,"C":…}' --correct A|B|C
  verify-math.mjs --bundle <post-bundle-dir>`);
  process.exit(1);
}

function getFlag(name) {
  const i = args.indexOf(name);
  return i === -1 ? null : args[i + 1];
}

function getAllFlags(name) {
  const out = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === name) out.push(args[i + 1]);
  }
  return out;
}

/** Normalize French-style math strings to JS-ish expressions. */
function normalizeExpr(raw) {
  let s = String(raw).trim();
  s = s.replace(/\s+/g, '');
  s = s.replace(/,/g, '.');
  s = s.replace(/×/g, '*');
  s = s.replace(/÷/g, '/');
  s = s.replace(/−/g, '-');
  s = s.replace(/(\d)%/g, '($1/100)');
  s = s.replace(/√(\d+)/g, 'Math.sqrt($1)');
  s = s.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');
  s = s.replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)');
  // bare fractions a/b not already in parens
  s = s.replace(/(^|[^\d.])(\d+)\/(\d+)(?!\d)/g, '$1($2/$3)');
  return s;
}

function assertSafe(expr) {
  const allowed = /^[\d+\-*/().,%Math.sqrtpow\s]+$/;
  if (!allowed.test(expr)) {
    throw new Error(`unsafe or unsupported expression: ${expr}`);
  }
}

function evalExpr(raw) {
  const expr = normalizeExpr(raw);
  assertSafe(expr);
  // eslint-disable-next-line no-new-func
  const val = Function(`"use strict"; return (${expr});`)();
  if (typeof val !== 'number' || !Number.isFinite(val)) {
    throw new Error(`expression did not evaluate to a finite number: ${raw}`);
  }
  return val;
}

function approxEqual(a, b, eps = 1e-9) {
  return Math.abs(a - b) <= eps;
}

function parseNumber(v) {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return evalExpr(v);
  throw new Error(`expected number or expr string, got ${typeof v}`);
}

function verifyExprs(exprs, expect) {
  const target = parseNumber(expect);
  const results = exprs.map((e) => ({ expr: e, value: evalExpr(e) }));
  const bad = results.filter((r) => !approxEqual(r.value, target));
  if (bad.length) {
    const detail = bad.map((r) => `${r.expr} → ${r.value}`).join('; ');
    throw new Error(`expected ${target}, mismatch: ${detail}`);
  }
  return { ok: true, expect: target, checked: results };
}

function verifyQcm(options, correct) {
  const key = String(correct).toUpperCase();
  if (!options[key]) throw new Error(`correct option ${key} not in options`);
  const values = Object.fromEntries(
    Object.entries(options).map(([k, v]) => [k.toUpperCase(), parseNumber(v)])
  );
  const correctVal = values[key];
  const others = Object.entries(values).filter(([k]) => k !== key);
  const dup = others.find(([, v]) => approxEqual(v, correctVal));
  if (dup) {
    throw new Error(`options ${key} and ${dup[0]} both equal ${correctVal}`);
  }
  return { ok: true, correct: key, values };
}

function parseSimpleYamlBlock(text, key) {
  const lines = text.split('\n');
  const start = lines.findIndex((l) => l.trim() === `${key}:`);
  if (start === -1) return null;

  const block = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^\S/)) break;
    block.push(line);
  }
  return block.join('\n');
}

function parseVerifyFromBundle(dir) {
  const md = readFileSync(join(dir, 'post.md'), 'utf8');
  const fm = md.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) throw new Error('no frontmatter in post.md');

  const body = fm[1];
  const answerLine = body.match(/^\s*answer:\s*(.+)$/m);
  const exprLines = [...body.matchAll(/^\s+-\s+"(.+)"\s*$/gm)].map((m) => m[1]);
  const exprsFromList = body.match(/exprs:\s*\n((?:\s+-\s+.+\n?)+)/);
  let exprs = exprLines;
  if (exprsFromList) {
    exprs = [...exprsFromList[1].matchAll(/-\s+"(.+?)"/g)].map((m) => m[1]);
  }
  const singleExpr = body.match(/^\s*exprs:\s*\[(.+)\]/m);
  if (singleExpr) {
    exprs = singleExpr[1].split(',').map((s) => s.trim().replace(/^"|"$/g, ''));
  }

  const qcmMatch = body.match(/qcm:\s*\n\s+options:\s*\n((?:\s+.+\n?)+)\s+correct:\s*(\w)/);
  if (qcmMatch) {
    const optLines = qcmMatch[1];
    const options = {};
    for (const m of optLines.matchAll(/(\w):\s*(.+)/g)) {
      options[m[1].toUpperCase()] = m[2].trim().replace(/^"|"$/g, '');
    }
    return { qcm: { options, correct: qcmMatch[2].toUpperCase() } };
  }

  if (!answerLine && exprs.length === 0) {
    throw new Error('no verify block in post.md — add verify.answer + verify.exprs, or pass --expr/--expect');
  }
  return { answer: answerLine?.[1].trim(), exprs };
}

function main() {
  const bundle = getFlag('--bundle');
  if (bundle) {
    if (!existsSync(join(bundle, 'post.md'))) {
      throw new Error(`missing post.md in ${bundle}`);
    }
    const spec = parseVerifyFromBundle(bundle);
    if (spec.qcm) {
      const r = verifyQcm(spec.qcm.options, spec.qcm.correct);
      console.log(JSON.stringify({ ok: true, mode: 'qcm', ...r }, null, 2));
      return;
    }
    const r = verifyExprs(spec.exprs.length ? spec.exprs : [spec.answer], spec.answer);
    console.log(JSON.stringify({ ok: true, mode: 'expr', ...r }, null, 2));
    return;
  }

  const qcmRaw = getFlag('--qcm');
  const correct = getFlag('--correct');
  if (qcmRaw) {
    if (!correct) usage();
    const options = JSON.parse(qcmRaw);
    const r = verifyQcm(options, correct);
    console.log(JSON.stringify({ ok: true, mode: 'qcm', ...r }, null, 2));
    return;
  }

  const exprs = getAllFlags('--expr');
  const expect = getFlag('--expect');
  if (!exprs.length || expect == null) usage();
  const r = verifyExprs(exprs, expect);
  console.log(JSON.stringify({ ok: true, mode: 'expr', ...r }, null, 2));
}

try {
  main();
} catch (err) {
  console.error(`verify-math: FAIL — ${err.message}`);
  process.exit(1);
}
