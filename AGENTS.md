# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **marketing-assets repository**, not a deployable app. The only
executable "application" is a Playwright + ffmpeg script that renders HTML reel
animations into Meta-ready 9:16 MP4s.

### Services / commands
- **Build/run the reels**: `npm run capture:reels` (the only npm script). It
  loads the standalone HTML in
  `campaigns/2026-06-18-meta/meta-ads-for-prep-service/project/`, captures
  frames headlessly, and encodes MP4s into
  `campaigns/2026-06-18-meta/output/` (1080×1920, H.264). Outputs and the
  `.frames-*/` scratch dirs are gitignored.
- **Lint / automated tests**: none exist in this repo.

### Non-obvious notes
- `ffmpeg` must be on PATH (preinstalled on the VM via apt). The script hard
  exits if missing.
- The script renders by **seeking the CSS animation timeline**, not wall-clock,
  so capture is deterministic regardless of machine speed.
- Headless Chromium runs fine out of the box; no extra system libs were needed
  beyond the Playwright browser download (`npx playwright install chromium`,
  handled by the startup update script).
- Per-run output is ~7s per reel; expect a handful of MP4s + `preview-*.png`
  frame grabs to visually verify framing.

## Social posting (Postiz CLI)

Publishing to Facebook / Instagram / TikTok goes through the **Postiz CLI**
(`postiz`, a devDependency — run it with `npx postiz ...`). The agent skill at
`.agents/skills/postiz/skills/postiz/SKILL.md` is the authoritative command
reference; read it before composing posts.

### Auth & channels
- `POSTIZ_API_KEY` is pre-injected as a secret. No `auth:login` needed — verify
  with `npx postiz auth:status`.
- The connected Postiz account ("Albert Prep") has **Instagram, Facebook, and
  TikTok** channels linked.
- **Never hardcode Postiz integration IDs** (the opaque `cmq...` cuids) — they
  rotate when a channel is reconnected, and a stale ID can silently target the
  wrong account. The stable identity is `{provider, handle}`, mapped to short
  aliases in `social.channels.json`.
- Resolve live IDs from those aliases at runtime (one `integrations:list` call
  per session):
  ```bash
  eval "$(npm run -s social:resolve)"   # exports IG_ID / FB_ID / TIKTOK_ID
  npx postiz posts:create -c "..." -s "$DATE" -i "$IG_ID" ...
  ```
  Other forms: `node scripts/resolve-channels.mjs --json` (alias→id map) and
  `node scripts/resolve-channels.mjs ig` (single id for `$(...)`). The resolver
  exits non-zero if a configured channel isn't connected. Add/rename channels by
  editing `social.channels.json`, not the script.

### Non-obvious gotchas (verified during setup)
- **`postiz upload` prints a `✅ File uploaded successfully!` banner line BEFORE
  the JSON.** Piping straight to `jq` fails. Strip the banner first:
  `npx postiz upload <file> | tail -n +2 | jq -r '.path'`.
- **Instagram requires media** (`-m <uploaded-path>`) plus
  `--settings '{"post_type":"post"}'` (or `"story"`). A media-less IG *draft*
  will be accepted but cannot publish.
- **Facebook** accepts text-only posts; media is optional.
- Every `-m` value MUST be a Postiz-uploaded URL (`.path`), never a raw local
  file path — IG/TikTok reject anything else.
- `-s <ISO-date>` is **required** even for drafts. Use `-t draft` to stage
  without publishing; `posts:status <id> --status schedule` promotes it later.
- Verify with `npx postiz posts:list`; remove test posts with
  `npx postiz posts:delete <id>`.
- The agent cannot visually confirm a live post (no browser into Meta); confirm
  via `posts:list` state and `releaseURL` after publishing.
