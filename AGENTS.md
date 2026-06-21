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
