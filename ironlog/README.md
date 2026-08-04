# IronLog

A personal, mobile-first workout tracker built around a fixed **Push / Pull / Legs**
weekly split. True-black theme with pink accents, an automatic rest timer, history, and
stats — inspired by apps like Strong and Hevy but tailored to one routine.

**Live:** https://wilsonang2010-boop.github.io/eae-portfolio/ironlog/

## Weekly schedule

| Day | Workout |
|-----|---------|
| Monday | Push |
| Tuesday | Pull |
| Wednesday | Legs |
| Thursday | Push |
| Friday | Pull |
| Saturday | Rest Day 💪 |
| Sunday | Legs |

The app opens straight to **today's** workout based on the current day. Saturday shows
_"Rest Day 💪 Recovery is part of progress."_

## Features

- **Workout tracking** — muscle-group sections, warm-up + working sets, a big tap
  checkbox on every set, per-set weight (kg/lbs), reps, and an optional note. Completed
  sets turn pink; a progress bar at the top tracks completion %.
- **Built-in keypad** — weight and reps open a large in-app numeric pad with plate
  shortcuts (±2.5 / ±5) instead of the phone keyboard. Keeps the OS keyboard out of the
  way, and stops iOS "shake to undo" firing mid-workout. Bar lifts also show a **plate
  calculator** ("20 bar + 20×2 / side").
- **Per-set effort & notes** — tag a set Easy / Solid / Hard and attach a note.
- **Session note and live clock** — jot how the session went; the header shows elapsed
  time once the first set is ticked.
- **Rest timer** — auto-starts a 2:30 countdown after a set. Pause / Restart / Skip, ±15s,
  and a beep + vibration when it finishes. The stopwatch button in the top bar starts a
  rest any time. The countdown runs off wall-clock time and is saved as it goes, so it
  stays accurate if the phone locks, you switch apps, or you close IronLog entirely —
  reopening picks it up at the right second. It holds a screen wake lock while running and
  posts a notification if it finishes while the app is in the background. Working sets
  always trigger it; plyometrics (on by default) and warm-ups (off by default) are
  toggleable in Settings.
- **Summary** — sets completed, duration, completion %, and a calorie estimate.
- **History** — a session joins the log the moment you tick your first set, so the
  calendar, stats and streak stay live mid-workout and an unfinished day is never lost.
  Month calendar with completed days, a recent list, **search and Push/Pull/Legs
  filters**, and tap-to-view/edit past sessions.
- **Session flexibility** — add or remove sets, add a warm-up, skip an exercise when a
  machine is taken, and swap today's split (do Push on a Tuesday, or train on a rest day).
  Destructive actions offer **Undo**. Rest length can be **overridden per exercise**.
- **Auto-progression** — hit every rep at the same weight last time and a chip offers the
  next jump (+2.5 kg upper, +5 kg lower), applied to all working sets in one tap.
  "Repeat last" refills an exercise from your previous session.
- **Exercise detail** — tap any exercise name for its full history, volume and estimated
  1RM trend charts, and its PR.
- **Statistics** — this week vs last (workouts, sets, volume), current & longest streak,
  totals, completion rate, muscle-group balance, and personal records ranked by
  **estimated 1RM** (so 60 kg × 8 correctly outranks 70 kg × 1). **Plateau detection**
  flags lifts with no progress in 3+ sessions, and bodyweight is charted over time.
- **Smart weights** — when you start a workout, the previous week's weights for each
  exercise are pre-filled; warm-ups suggest ~50% of the working weight.
- **Settings** — rest-timer length, which set types auto-rest, units (kg/lbs), accent
  colour (pink, rose, violet, green, blue), AMOLED black, plate calculator and bar
  weight, timer sound, vibration, daily reminders, bodyweight, and JSON or CSV export /
  JSON import.

## Theme

Pure black background with pink accents by default. Every accent surface is driven by CSS
variables (`--accent`, `--accent-ghost`, `--accent-line`, `--accent-glow`, `--on-accent`)
that `applyTheme()` rewrites from a single palette entry, so switching accent recolours
the whole app — checkboxes, charts, timer ring, chips and glows included.

## Performance

The log is read-heavy, so analytics are memoized and writes are coalesced. Measured in
headless Chromium against a year of training (313 sessions, 421 KB of history):

| | before | after |
|---|---|---|
| Render today | 20.3 ms | **4.3 ms** (2.4 ms warm) |
| Render stats | 31.5 ms | **15.4 ms** (7.0 ms warm) |
| Render history | 32.4 ms | **11.0 ms** |
| localStorage writes per 30 taps | 30 | **1** |

## Offline & data

The app is a self-contained PWA (`index.html` + service worker) and works fully offline —
all data lives in `localStorage` on the device. It asks the browser for persistent storage
and prompts for a backup every 10 workouts. There's no backend, so use
**Settings → Export backup** (JSON or CSV) to move data between devices. Installable to
the home screen via the web app manifest.

## Files

- `index.html` — the entire app (HTML + CSS + JS).
- `manifest.webmanifest`, `sw.js`, `icon-*.png` — PWA shell, offline cache, and icons.
