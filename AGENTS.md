# AGENTS.md

## Cursor Cloud specific instructions

This repo is a **marketing-assets repository**, not a deployable app. The only
executable "application" is a Playwright + ffmpeg script that renders HTML reel
animations into Meta-ready 9:16 MP4s.

### Services / commands
- **Build/run the reels**: `npm run capture:reels`. It loads the standalone HTML
  in `content/paid/meta/2026-06-18/design-export/project/`, captures frames
  headlessly, and encodes MP4s into `content/paid/meta/2026-06-18/output/`
  (1080×1920, H.264). Outputs and the `.frames-*/` scratch dirs are gitignored.
- **Export HTML posts**: `npm run html:to-image` / `npm run html:to-mp4` (see
  `tools/README.md`).
- **Social channels**: `npm run social:status` / `npm run social:channels`.
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
  TikTok** channels linked. Always discover live IDs with
  `npx postiz integrations:list` (IDs change if a channel is reconnected).

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
