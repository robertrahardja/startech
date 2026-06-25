# CapCut Assembly — Step by Step

Follow top to bottom. Estimated time: 60 minutes for video 1, dropping to 25 min by video 5.

## Setup

1. Download CapCut from `capcut.com` if you don't have it
2. New Project → **16:9 aspect ratio**, **1080p**
3. Rename project: `StarTech-AI-Insights-001-JPMorgan`

## Step 1 — Drop in audio (5 min)

1. Drag your 4 ElevenLabs MP3s onto the **audio track** (bottom)
2. They should auto-snap end to end. If not, drag chunk-02 to start exactly when chunk-01 ends.
3. Total audio should be ~5–6 minutes. If it's much shorter, double-check you pasted all 4 chunks into ElevenLabs.

## Step 2 — Background music (3 min)

1. Audio panel → Music → Browse free library
2. Search keywords: `corporate ambient`, `minimal cinematic`, `tech background`
3. Pick something **instrumental** and **low-energy** — avoid drums, vocals, anything that competes with your voice
4. Drag onto a **second audio track** below your voice
5. Set volume to **10%** (mixer panel). Your voice is the focus.
6. Trim music to match total video length. Fade out last 3 seconds.

## Step 3 — Intro card, 3 seconds (5 min)

1. Add a **black/navy solid background** clip from CapCut's stock library
2. Add text overlay: `StarTech AI Insights`
3. Font: bold (any Sans-Serif heavy weight)
4. Color: white with a thin gold underline
5. Add fade-in 0.5s, fade-out 0.5s
6. Place this BEFORE your first audio chunk (push audio right by 3 seconds)

## Step 4 — Drop B-roll over voice (25 min)

Layer B-roll on the **video track above** the audio. Use this map:

| Time | Clip | Why |
|---|---|---|
| 0:03–0:11 | broll-01-tower | "JPMorgan Chase just did..." |
| 0:11–0:17 | broll-02-headlines | "...reclassified AI..." |
| 0:17–0:27 | broll-03-office | "The 2026 number is 19.8 billion..." |
| 0:27–0:35 | broll-04-datacenter | "...if you're running an SMB..." |
| 0:35–0:43 | (text overlay only — see Step 5) | "lesson is the category change" |
| 0:43–0:53 | broll-03-office (cut B) | "For five years, AI sat in innovation budget" |
| 0:53–1:03 | broll-07-spreadsheet | "CFO had a line that said experimental" |
| 1:03–1:15 | broll-04-datacenter | "AI is now sitting next to the electricity bill" |
| 1:15–1:25 | broll-05-smb-office | "30-person company in Tanjong Pagar" |
| 1:25–1:35 | broll-06-warehouse | "12-person logistics firm in Tuas" |
| 1:35–1:45 | (text overlay "1" — see Step 5) | "One. Stop calling it AI" |
| 1:45–2:30 | broll-07-spreadsheet + broll-08-paperwork (alternate every 10s) | Reframe budget section |
| 2:30–2:45 | (text overlay "2" — see Step 5) | "Two. Pick the boring task" |
| 2:45–3:30 | broll-09-scanning + broll-10-email (alternate) | Boring task section |
| 3:30–3:45 | (text overlay "3" — see Step 5) | "Three. Build for portability" |
| 3:45–4:30 | broll-11-code | Portability section |
| 4:30–4:50 | broll-12-singapore | "the link is in the description" |
| 4:50–5:00 | (outro card — see Step 6) | "See you in the next one" |

**Cutting technique**: each B-roll clip starts at its time in the audio. Trim the right edge to match the next clip's start time. Use CapCut's **split tool** (S key) to chop clips.

## Step 5 — Text overlays for the 3 points (10 min)

At each `[1]`, `[2]`, `[3]` callout in the script, add a full-screen text card for ~2 seconds:

**Card 1** at 1:35:
```
1.
STOP CALLING IT AI.
CALL IT STAFF.
```
Style: huge bold yellow "1" on top, white text below, dark navy background. CapCut → Text → Title templates → pick a clean bold preset.

**Card 2** at 2:30:
```
2.
PICK THE BORING TASK.
```

**Card 3** at 3:30:
```
3.
BUILD FOR PORTABILITY.
```

Each card: 2 seconds. Fade in 0.3s, fade out 0.3s.

## Step 6 — Outro card, 5 seconds (3 min)

After the last audio chunk:
1. Black background
2. Text top: `startech-innovation.com`
3. Text middle: `90-day AI for Singapore SMBs`
4. Text bottom (smaller): `Subscribe for daily AI insights`
5. Hold for 5 seconds

## Step 7 — Captions (15 min)

**Option A — Use auto captions** (free in CapCut):
1. Select your voice audio track → right-click → Auto-generate captions → English
2. Wait 30 seconds
3. Review for errors. Known fixes you'll need to make:
   - "Tuas" often becomes "twos" or "tools" → fix manually
   - "JPMorgan" sometimes splits to "J P Morgan" → fix to "JPMorgan"
   - "Tanjong Pagar" gets butchered → fix manually
   - "LangChain" / "LiteLLM" → fix manually
4. Style: white text, black outline, bottom-third centered, font size 60

**Option B — Use the pre-built SRT** (more accurate):
1. Subtitles panel → Import → select `captions.srt` from this folder
2. Style same as Option A

## Step 8 — Export (5 min)

1. Top right → Export
2. Settings:
   - Resolution: **1080p**
   - Frame rate: **30fps**
   - Bitrate: **Recommended (8 Mbps)**
   - Format: **MP4**
   - Codec: **H.264**
3. Save as: `startech-ai-insights-001-jpmorgan.mp4` in this folder
4. Wait ~3 minutes for export

## Step 9 — QA before upload

Before uploading to YouTube, watch the **whole thing on mute with captions on**.

Check:
- [ ] Captions readable on mobile (zoom out, view at 6 inches from your face)
- [ ] No B-roll clip starts mid-zoom (looks amateur — trim to a stable frame)
- [ ] Audio doesn't clip or distort
- [ ] Background music doesn't drown out voice in any section
- [ ] Intro and outro cards are clean
- [ ] The 3 numbered cards line up with the script callouts

If anything fails, fix it now. YouTube re-uploads are messy.

## Common first-video mistakes

- **B-roll too long on one clip** — viewers tune out after 8 seconds on the same clip. Cut.
- **Voice too quiet** — peak should hit -3dB, not -10dB. Use the audio mixer.
- **Background music in the same key as your voice** — sounds muddy. Pick a different track.
- **Captions covering the bottom B-roll** — move captions up to lower-third if needed.
- **No fade between music start/end** — sounds abrupt. Add 0.5s fades.
