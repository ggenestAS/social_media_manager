# Sound design samples — sources and licences

Every reel cue is a short sample from this folder, placed by
`tools/html-to-mp4.mjs` at the times `reel-timeline.js` emits
(`data-audio-cues`). Samples are 48 kHz stereo 16-bit WAV, trimmed to the
transient, peak-normalised to −3 to −5 dBFS, with a short fade-out. No music.

| File | Cue | Source | Licence |
|---|---|---|---|
| `paper-slide.wav` | paper wipes down (0.1 s) | Mixkit #2389 "Paper quick movement" | Mixkit Sound Effects Free License |
| `key-1.wav` | headline word 1, 4, 7… | Mixkit #1362 "Typewriter soft hit" | Mixkit Sound Effects Free License |
| `key-2.wav` | headline word 2, 5, 8… | Mixkit #1380 "Typewriter single mechanical hit" | Mixkit Sound Effects Free License |
| `key-3.wav` | headline word 3, 6, 9… | Mixkit #1119 "Typewriter soft click" | Mixkit Sound Effects Free License |
| `key-soft.wav` | hero words | Mixkit #1119, quieter, low-passed 6 kHz | Mixkit Sound Effects Free License |
| `slam.wav` | ink panel slams up | Mixkit #2804 "Wood hard hit", bass +9 dB @110 Hz, low-passed 2.2 kHz | Mixkit Sound Effects Free License |
| `click-soft.wav` | masthead, kicker, footer settle | Kenney *Interface Sounds* `click_001` | CC0 1.0 |
| `pop.wav` | reply punches in, CTA pops | Kenney *Interface Sounds* `drop_003` | CC0 1.0 |
| `chime.wav` | accent words turn blue | Kenney *Interface Sounds* `glass_001`, low-passed 9 kHz | CC0 1.0 |
| (generated) | room-tone bed | ffmpeg `anoisesrc=pink`, band-passed 90–700 Hz, −29 dB | — |

Sources: Mixkit files are `https://assets.mixkit.co/active_storage/sfx/<id>/<id>.wav`
(catalogue pages under `https://mixkit.co/free-sound-effects/`). Kenney pack:
`https://kenney.nl/assets/interface-sounds` (`kenney_interface-sounds.zip`, 2020).

## Licence notes (read before reuse)

- **Mixkit Sound Effects Free License** (mixkit.co/license, "Sound Effects
  Free License"): free for commercial and non-commercial projects including
  advertising, no attribution required, non-exclusive; the raw files may not
  be redistributed or sold as-is. The trimmed, filtered WAVs here are part of
  a finished video, which the licence allows; do not publish this folder as a
  sample pack. Terms were read from Mixkit's public summary on 2026-09-21 —
  re-check the licence page if Mixkit changes it.
- **Kenney CC0**: public domain dedication, any use, credit optional
  ("Kenney · kenney.nl").
- Not used, deliberately: the BBC Sound Effects archive (RemArc licence is
  non-commercial), Instagram/TikTok in-app music (not licensed for ads),
  Meta Sound Collection (licensed for Meta placements only, not TikTok).

## Re-processing

```bash
# example — trim to the transient, cap length, fade, 48k stereo
ffmpeg -i in.wav -af "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.02,atrim=0:0.3,afade=t=out:st=0.24:d=0.06,aformat=sample_rates=48000:channel_layouts=stereo,volume=0.9" -ar 48000 -ac 2 out.wav
```
Keep every hit under ~0.3 s except `paper-slide` (0.8 s) and `slam` (1.0 s):
the typing runs are 120–140 ms apart and longer samples smear into a drone.
