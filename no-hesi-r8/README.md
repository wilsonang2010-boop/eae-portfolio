# NO HESI · 中国高速 (China Expressway)

A self-contained pseudo-3D highway racer inspired by "No Hesi" — thread the gaps in
traffic at speed, but with two twists: a **semi-manual gearbox** and **adjustable power
steering**. Set on a Chinese expressway heading toward Shanghai.

Everything lives in a single file: [`index.html`](index.html) (HTML + CSS + JS, no build,
no dependencies). Open it in any modern browser.

## Controls

| Key | Action |
| --- | --- |
| `W` / `↑` | Throttle |
| `S` / `↓` | Brake |
| `A` / `D` | Steer / change lanes |
| `K` | Shift up |
| `L` | Shift down |
| `Space` | Shift up (alt) |
| `P` | Pause |

On touch devices: hold the left / right half of the screen to steer (holding also applies
throttle), and double-tap a side to up/down-shift.

## Semi-manual shifting

Six-speed gearbox with an automatic clutch — you pick the gears, the game handles the rest.

- Each gear has a speed ceiling. Hold throttle at the ceiling and you hit the **rev
  limiter** (shift light lit) — you stop accelerating until you upshift.
- Torque follows a powerband: **upshift too early and the engine bogs down** at the bottom
  of the gear, so acceleration crawls. Keep the needle in the meat of the band.
- **Downshifting** drops the gear ceiling below your speed, so the engine brakes you — handy
  for scrubbing speed into a tight bend.

## Power steering (adjustable)

The **动力转向 · Power Steering** slider at the top of the screen scales steering authority
live, from `0.30×` (heavy, stable) to `2.00×` (sharp, twitchy). Adjust it any time —
higher values make quick lane-changes easier but the car harder to hold straight at speed.

## China setting

Shanghai skyline on the horizon (Oriental Pearl-style tower and a twisting supertall),
green overhead gantry signs with Chinese city names (上海 / 杭州 / 南京 / 苏州 …),
red-and-white expressway guardrails, roadside pagodas, red lanterns, and blue Chinese
licence plates on the traffic.

## Notes

- Distance, overtakes, and a locally-stored best distance are tracked in the HUD.
- This folder is standalone and separate from the portfolio site; it shares nothing with
  `index.html` at the repo root.
