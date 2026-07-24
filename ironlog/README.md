# IronLog

A personal, mobile-first workout tracker built around a fixed **Push / Pull / Legs**
weekly split. Sleek dark theme, green "completed" accents, an automatic rest timer,
history, and stats — inspired by apps like Strong and Hevy but tailored to one routine.

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
  sets turn green; a progress bar at the top tracks completion %.
- **Rest timer** — auto-starts a 2:30 countdown after every *working* set (skipped for
  plyometrics). Pause / Restart / Skip, ±15s, and a beep + vibration when it finishes.
- **Summary** — sets completed, duration, completion %, and a calorie estimate.
- **History** — every workout is saved. Month calendar with completed days, a recent
  list, and tap-to-view/edit past sessions.
- **Statistics** — current & longest streak, total workouts, total sets, completion
  rate, and personal records (heaviest working set per exercise).
- **Smart weights** — when you start a workout, the previous week's weights for each
  exercise are pre-filled.
- **Settings** — rest-timer length, units (kg/lbs), accent colour, AMOLED black, timer
  sound, vibration, daily reminders, bodyweight (for calories), and JSON export/import.

## Offline & data

The app is a self-contained PWA (`index.html` + service worker) and works fully offline —
all data lives in `localStorage` on the device. There's no backend, so use
**Settings → Export backup** to move data between devices. Installable to the home screen
via the web app manifest.

## Files

- `index.html` — the entire app (HTML + CSS + JS).
- `manifest.webmanifest`, `sw.js`, `icon-*.png` — PWA shell, offline cache, and icons.
