# IronLog

A personal, mobile-first workout tracker built around a **Push / Pull / Legs** weekly
split. True-black theme with pink accents, an automatic rest timer, history, and stats —
inspired by apps like Strong and Hevy but tailored to one routine.

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
_"Rest Day 💪 Recovery is part of progress."_ This is the default — the split is editable
in **Settings → Your programme**, so any day can be reassigned.

## Features

- **Workout tracking** — muscle-group sections, warm-up + working sets, a big tap
  checkbox on every set, per-set weight (kg/lbs), reps, and an optional note. Completed
  sets turn pink; a progress bar at the top tracks completion %.
- **Built-in keypad** — weight and reps open a large in-app numeric pad with plate
  shortcuts (±2.5 / ±5) instead of the phone keyboard. Keeps the OS keyboard out of the
  way, and stops iOS "shake to undo" firing mid-workout. Bar lifts also show a **plate
  calculator** ("20 bar + 20×2 / side").
- **Per-set effort & notes** — tag a set Easy / Solid / Hard and attach a note.
  **"Same as previous set"** copies the weight and reps from the row above.
- **Session note and live clock** — jot how the session went; the header shows elapsed
  time once the first set is ticked.
- **Rest timer** — auto-starts a 2:30 countdown after a set. Pause / Restart / Skip, ±15s,
  and a beep + vibration when it finishes. The stopwatch button in the top bar starts a
  rest any time. The countdown runs off wall-clock time and is saved as it goes, so it
  stays accurate if the phone locks, you switch apps, or you close IronLog entirely —
  reopening picks it up at the right second, and tells you if it ran out while you were
  away. It holds a screen wake lock while running. Working sets always trigger it;
  plyometrics (on by default) and warm-ups (off by default) are toggleable in Settings.
  The finish alarm is queued on the audio clock up front, so it **still sounds with the
  app backgrounded or the phone locked** — see
  [Alarm when the app isn't in front](#alarm-when-the-app-isnt-in-front).
  Open a sheet or the keypad and the panel **condenses to a pill in the top corner**
  rather than covering it; tap the pill to bring the controls back.
- **Summary** — sets completed, duration, completion %, and a calorie estimate.
- **History** — a session joins the log the moment you tick your first set, so the
  calendar, stats and streak stay live mid-workout and an unfinished day is never lost.
  Month calendar with completed days, a recent list, **search and Push/Pull/Legs
  filters**, and tap-to-view/edit past sessions.
- **Session flexibility** — add or remove sets, add a warm-up, skip an exercise when a
  machine is taken, and swap today's split (do Push on a Tuesday, or train on a rest day).
  Tapped Finish by mistake? **Resume** from the summary sheet or the banner on Today —
  the clock and Finish button come back and the log entry stays put. Destructive actions
  offer **Undo**. Rest length can be **overridden per exercise**.
- **Auto-progression** — hit every rep at the same weight last time and a chip offers the
  next jump (+2.5 kg upper, +5 kg lower), applied to all working sets in one tap.
  Exercises can carry a **rep range** (`8–12`) instead of a fixed target: you add reps
  week to week, and the weight jump is only offered once every set reaches the top of
  the range, dropping you back to the bottom. "Repeat last" refills an exercise from
  your previous session.
- **Exercise detail** — tap any exercise name for its full history, volume and estimated
  1RM trend charts, its PR, and **every note you've written against it**.
- **Your programme** — the weekly split is editable (tap any day to cycle
  Push / Pull / Legs / Rest), and each day's exercise list can be **reordered, pruned,
  or extended with your own movements** — name, muscle group, sets, reps, and
  barbell / warm-up / plyometric flags. Sessions already logged keep the exercises
  they were done with.
- **Live personal records** — a set that beats your best estimated 1RM for that
  movement is flagged **PR** on the spot, not retroactively in Stats a week later.
- **Statistics** — this week vs last (workouts, sets, volume), a **weekly session goal**,
  a **12-week volume trend**, **recovery** (days since each muscle group was last
  trained), current & longest streak, totals, completion rate, muscle-group balance,
  and personal records ranked by
  **estimated 1RM** (so 60 kg × 8 correctly outranks 70 kg × 1). **Plateau detection**
  flags lifts with no progress in 3+ sessions, and bodyweight is charted over time.
- **Smart weights** — when you start a workout, the previous week's weights for each
  exercise are pre-filled; warm-ups suggest ~50% of the working weight.
- **Settings** — weekly split and per-day exercise lists, weekly goal, rest-timer
  length, which set types auto-rest, units (kg/lbs), **appearance (dark / light /
  follow system)**, accent colour (pink, rose, violet, green, blue), AMOLED black,
  plate calculator and bar weight, timer sound, vibration, daily reminders,
  bodyweight, and JSON or CSV export / JSON import.

## Theme

Pure black background with pink accents by default, plus a **light theme** that can
follow the system. Every accent surface is driven by CSS variables (`--accent`,
`--accent-ghost`, `--accent-line`, `--accent-glow`, `--on-accent`) that `applyTheme()`
rewrites from a single palette entry, so switching accent recolours the whole app —
checkboxes, charts, timer ring, chips and glows included. Light mode moves only the
neutrals (plus `--chrome` for the translucent nav), so every accent still works in both.

## Performance

The log is read-heavy, so analytics are memoized and writes are coalesced. Measured in
headless Chromium against a year of training (313 sessions, 421 KB of history):

| | before | after |
|---|---|---|
| Render today | 20.3 ms | **4.3 ms** (2.4 ms warm) |
| Render stats | 31.5 ms | **15.4 ms** (7.0 ms warm) |
| Render history | 32.4 ms | **11.0 ms** |
| localStorage writes per 30 taps | 30 | **1** |

## Alarm when the app isn't in front

The finish sound used to be played at the moment JS noticed the countdown had hit zero
— which is exactly what stops happening once the app isn't in front. Backgrounded, the
beep simply never came.

The whole alarm is now scheduled on the **audio clock** when the rest *starts*. Web Audio
renders on its own thread and keeps that schedule while the page is throttled or frozen,
so the tones land on time with the phone locked or another app open. Two things make it
hold: the context is created from the tap that starts the rest, and an inaudible
keep-alive loop runs for the duration, because iOS suspends a context with nothing
playing — and the pending schedule with it.

| situation | what you get |
|---|---|
| App in front | Beep, vibration, 3-2-1 countdown cue |
| Backgrounded, or phone locked | **Alarm sounds on time** (audio clock), plus a notification |
| App force-quit (swiped away) | Nothing — the process is gone. Reopening says *"Rest finished N min ago"* |

Toggle it under **Settings → Alarm when app is closed**. It costs a little battery and
can take over the audio session from music you're playing, which is why it's a switch
rather than unconditional.

A notification banner is still best-effort: the deadline is handed to the service worker
too, but the OS can evict the worker, and a genuinely closed PWA can't be woken without
a push server. The audio alarm is what makes the timer dependable — it doesn't depend on
our code running at the right moment, only on the sound already being queued.

Notification permission is requested the first time you actually start a rest — never on
load.

## Offline & data

The app is a self-contained PWA (`index.html` + service worker) and works fully offline —
all data lives in `localStorage` on the device. It asks the browser for persistent storage
and prompts for a backup every 10 workouts. There's no backend, so use
**Settings → Export backup** (JSON or CSV) to move data between devices. Installable to
the home screen via the web app manifest.

Backups carry `app` and `format` fields and are **validated on import** — a truncated
download, another app's JSON, or a file from a newer build is refused with a specific
reason rather than silently replacing your log.

If a write ever fails — storage full, or private browsing — a red banner says so and
offers an immediate export. Failing silently would be the worst outcome for a training
log: the app would keep working and none of it would survive a reload.

When a new version has downloaded, a banner offers a reload. The service worker no
longer calls `skipWaiting()` on install, so an update never takes over mid-session; it
waits for you to accept it.

**A note on volume:** working sets only. Warm-ups used to be counted, which inflated
total volume, weekly volume and muscle-group balance — expect those numbers to read
lower, and more accurately, than they used to.

## iOS viewport

`position:fixed` anchors to the *layout* viewport, and iOS can move the visible
viewport away from it — which strands the bottom nav and rest timer partway up the
screen with page content still drawn below them.

The main trigger was our own: focusable controls were `15px`, and iOS auto-zooms the
page whenever you focus something under `16px`. That zoom detaches the viewport and
persists after the keyboard closes. `maximum-scale=1` is supposed to prevent it but
iOS has ignored that since iOS 10 — while Android honours it, which just blocks
legitimate pinch-zoom. So every control is now `16px` and `maximum-scale` is gone.

As a backstop, `syncChrome()` pins the bottom chrome to `window.visualViewport` via a
`--vv-bottom` variable, so if the two viewports drift apart anyway (keyboard, manual
zoom) the chrome follows what you can actually see. It's a no-op when they agree, and
the lift is capped at half a screen so a bad reading can't push the nav out of sight.

## Accessibility

Every control has an accessible name, including the icon-only steppers, calendar arrows
and programme editor buttons. Focus rings are drawn with `:focus-visible` (so they stay
out of the way of touch and mouse), and `prefers-reduced-motion` disables the pop, ring
and slide animations.

## Files

- `index.html` — the entire app (HTML + CSS + JS).
- `manifest.webmanifest`, `sw.js`, `icon-*.png` — PWA shell, offline cache, and icons.
