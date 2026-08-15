# IronLog

A personal, mobile-first workout tracker built around a **Push / Pull / Legs** weekly
split. True-black theme with pink accents, an automatic rest timer, history, and stats —
inspired by apps like Strong and Hevy but tailored to one routine.

**Live:** https://wilsonang2010-boop.github.io/eae-portfolio/apps/ironlog/

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

### Dunk day

A fifth workout type sits alongside Push / Pull / Legs, built for one goal: getting off
the floor. **Legs is untouched** — Dunk is an alternative, not a replacement. Switch
between them with the ⇄ button on Today for a single session, or reassign a weekday in
**Settings → Your programme** to make it permanent.

| # | Exercise | Sets × Reps | Why |
|---|---|---|---|
| 1 | Pogo Jump | 3 × 12 | Ankle stiffness — the cheapest centimetres there are |
| 2 | Approach Jump | 5 × 3 | The actual skill: penultimate step, arm swing, max intent |
| 3 | Depth Jump | 4 × 3 | Reactive strength, the shortest ground contact you can manage |
| 4 | Single-Leg Bound | 3 × 4 | A running dunk takes off from one leg |
| 5 | Trap Bar Jump | 5 × 3 | Rate of force development under load |
| 6 | Back Squat | 4 × 5 | Maximal strength — the base everything else scales from |
| 7 | Romanian Deadlift | 3 × 6 | Hamstrings and hips, where extension power comes from |
| 8 | Bulgarian Split Squat | 3 × 8 | Single-leg strength, matching the takeoff |
| 9 | Standing Calf Raise | 4 × 12 | Plantarflexion, and landing resilience |
| 10 | Hanging Leg Raise | 3 × 10 | Trunk stiffness, so force reaches the floor |

The order is deliberate: skill and reactive work first while the nervous system is fresh,
then power, then strength, then the accessories. Jumps are tagged plyometric so the rest
timer treats them correctly, and the three barbell lifts drive the plate calculator.

Quality beats volume here — every jump is a maximal attempt, and a jump you're too tired
to do well is training the wrong thing. Two dunk sessions a week is plenty alongside the
rest of the split.

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
  The finish alarm is queued on the audio clock up front and backed by a notification, so
  it **still reaches you with the app backgrounded or the phone locked** — and it **never
  pauses your music** unless you ask it to. See
  [Alarm when the app isn't in front](#alarm-when-the-app-isnt-in-front).
  Open a sheet or the keypad and the panel **condenses to a pill in the top corner**
  rather than covering it; tap the pill to bring the controls back.
- **Summary** — sets completed, duration, completion %, and a calorie estimate.
- **History** — a session joins the log the moment you tick your first set, so the
  calendar, stats and streak stay live mid-workout and an unfinished day is never lost.
  Month calendar with completed days, a recent list, **search and Push/Pull/Legs
  filters**, and tap-to-view/edit past sessions.
- **Session flexibility** — **add an exercise to today's session** (pick from everything
  you've logged before, or define a new one), optionally keeping it in that day's
  programme. Add or remove sets, add a warm-up, skip an exercise when a
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

### What was actually wrong

The keep-alive that holds the app awake during a rest was a Web Audio
`BufferSourceNode`. Chromium keeps a Web Audio graph running in a backgrounded tab, so
every test passed — **but iOS does not**. Safari suspends a page's `AudioContext` on
backgrounding unless a *media element* is playing, and a suspended context takes the
scheduled alarm down with it.

So the background alarm was never working on iOS. The tests were measuring Chromium's
behaviour and reporting it as a pass, which is why it was "fixed" three times and kept
coming back. Real bugs were found and fixed each round — a permanently-stuck permission
flag, an alarm that reported itself armed on a suspended context — but none of them were
this.

### How it works now

A near-silent looping `<audio>` element can be played for the duration of the rest. iOS
honours a playing media element: it establishes a media session, which keeps the **page
itself** alive. So the countdown, the alarm, the notification and the beep all simply
keep running, rather than being resurrected afterwards.

That hold works, and it has a price that only showed up in use: background audio
privilege requires the **playback** audio session, playback is the *non-mixable*
category, and so holding the page awake this way necessarily **pauses the user's music**
and shows the rest timer as a track on the lock screen. There is no flag that buys one
without the other — so the hold is now opt-in, and the default path never touches the
audio session.

**The hold runs for every rest either way** — it is what keeps the *page* alive, and the
page is what fires the alarm and the notification. Removing it to protect the user's music
was the wrong fix: it traded one broken thing for another, because the service-worker
fallback is exactly what iOS evicts. What the setting changes is the **audio session** the
loop runs under, declared through `navigator.audioSession`:

- **Default** — `ambient`: mixable, so your music is untouched, and no Now Playing card is
  claimed. Ambient rather than `transient` because transient *ducks* other audio and this
  loop plays for the whole rest. One-off beeps outside a rest use `transient`, the
  notification-chime category.
- **Take over audio during rest** — `playback`: the only category iOS guarantees
  background audio for, and the only one that stops your music. Off unless asked for.

Assigning an unsupported session type is either ignored or throws, so each candidate is
written and read back rather than trusted; browsers without the API are left alone. The
session is claimed before anything can play and re-asserted on return to the foreground,
since an interruption hands it back in whatever state the OS chose.

| situation | default (mixable hold) | take over audio |
|---|---|---|
| App in front | Beep, vibration, 3-2-1 cue | same |
| Backgrounded, or phone locked | Alarm + notification, as far as iOS lets an ambient session hold the page | **Alarm sounds on time**, plus a notification |
| Music playing | Untouched | **Paused for every rest** |
| App force-quit (swiped away) | Nothing — the process is gone. Reopening says *"Rest finished N min ago"* | same |

Two switches, under **Settings**:

- **Alarm when app is closed** — schedules the beep ahead of time and sends a
  notification. Mixes; nothing is paused.
- **Take over audio during rest** — off by default. Turn it on only if alarms are still
  being missed with the phone locked; it is the most reliable setting and the only one
  that interrupts your music.

**Settings → Test the alarm** reports the live audio state, the notification permission,
and either the active session type (`mixing (transient)`) or whether the background hold
is actually active, then fires a 3-second alarm. With the hold off, "not active" is the
correct state rather than a fault, and the diagnostics say so.

`bghold.js` asserts 19 invariants about the media hold specifically — that it starts with
a rest, survives Web Audio being unavailable entirely, is released on pause, skip and
natural finish, is re-taken on resume, honours the setting, and recovers from an
interruption on the next tap. `mix.js` asserts the 23 that matter for not disturbing other
audio, against a stubbed `navigator.audioSession` that records every type the page asks
for: a default install never requests `playback` and never publishes Now Playing metadata,
while opting in does both and releases them again afterwards.

`iosnotify.js` asserts 21 invariants **under iOS's rules rather than Chromium's** — see
below.

### The Notification constructor does not exist on iOS

`new Notification(...)` throws `TypeError: Illegal constructor` in a Home Screen web app.
Only `ServiceWorkerRegistration.showNotification()` exists. Chromium implements the
constructor happily, which is why this survived every test: two of the three call sites
used it directly, and the one in `toggleReminders()` was unguarded inside an `async`
function — so turning on **Workout reminders** saved the setting, threw, and surfaced as
the app falling over with nothing delivered.

Everything now goes through one `notify()` helper: worker first, constructor only as a
fallback for browsers with no worker, and it can neither throw nor reject. `iosnotify.js`
runs the app against a stubbed `Notification` whose constructor throws exactly as iOS's
does, and asserts that the app never reaches for it.

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

## Layout: why the nav isn't `position: fixed`

The bottom nav and rest timer were `position: fixed`, which anchors to the *layout*
viewport. iOS routinely moves the visible viewport away from that — it keeps reporting a
shrunken visual viewport long after the keyboard has gone, and any page zoom detaches it
outright. The chrome then rendered partway up the screen with workout content still drawn
below it. Trying to correct for it with `visualViewport` maths made it worse: a stale
reading was taken at face value and the nav was *actively* lifted into the middle.

So the layout no longer allows it. `body` is a flex column exactly one screen tall
(`100dvh`, `overflow:hidden`), `.app` is the scroll region inside it, and the nav is the
last flex item in normal flow. There is no arrangement in which page content can appear
below the nav, whatever the viewport reports. The rest timer is `position:absolute`
against the shell rather than the viewport.

`--vv-bottom` still lifts the timer, but only while a field is genuinely focused — the
one case where something really is covering the bottom of the screen. It's released the
moment focus leaves.

`shell.js` asserts 23 invariants around this, including under an injected stale viewport
of the kind that caused the original reports: the nav flush with the screen bottom, and
nothing rendered below it, on every tab, scrolled, and mid-rest.

Focusable controls are all `16px` — iOS auto-zooms the page when you focus anything
smaller, which was one way the viewport got detached in the first place. `maximum-scale`
is gone (iOS ignored it; Android used it to block pinch-zoom), and double-tap zoom is
handled separately — see below.

Dropping `maximum-scale` re-enabled **double-tap to zoom**, which fires constantly in an
app you tap this much. `touch-action: manipulation` is set on everything, but iOS doesn't
reliably honour it, so a `touchend` guard handles the second tap directly: cancel its
default action (the zoom) and re-issue the click so the control still responds. Narrow by
design — only a second tap within 350 ms, within 40 px, with no finger movement between,
outside a form control, and not mid-pinch.

**Settings → Version** shows the running build and taps to check for an update. Since
updates wait to be accepted, "am I actually on the new build?" is otherwise unanswerable
from the phone.

## Accessibility

Every control has an accessible name, including the icon-only steppers, calendar arrows
and programme editor buttons. Focus rings are drawn with `:focus-visible` (so they stay
out of the way of touch and mouse), and `prefers-reduced-motion` disables the pop, ring
and slide animations.

## Files

- `index.html` — the entire app (HTML + CSS + JS).
- `manifest.webmanifest`, `sw.js`, `icon-*.png` — PWA shell, offline cache, and icons.
