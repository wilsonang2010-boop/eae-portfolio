# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Personal aerospace portfolio website for **Ang How Cheng Wilson**, built to support an
application to Singapore Polytechnic's Diploma in Aerospace Electronics.

- **Live site:** https://wilsonang2010-boop.github.io/eae-portfolio/
- **Repo:** https://github.com/wilsonang2010-boop/eae-portfolio
- **Hosting:** GitHub Pages (deploys from `main` branch, root). Push to `main` = deploy.

## Architecture

Single-file website. Everything lives in `index.html` (HTML + CSS + JS in one file).

- `index.html` — the entire site: `<style>` block, markup, and a `<script>` block at the end.
- `images/` — all photos and certificates. Referenced by filename from `index.html`.
- `.claude/launch.json` + `.claude/serve.py` — local dev server (Python, port 8126).
- `no-hesi-r8/` — unrelated; not part of the portfolio. Leave it alone unless asked.

Sections in `index.html` (by `<section id>`): `home`, `about`, `journey`, `experience`,
`leadership`, `achievements`, `certificates`, `gallery`, `skills`, `why`, `goals`,
`testimonials`, `contact`.

## Design principles

- **Aesthetic:** Swiss / Apple minimalism — clean, restrained, lots of whitespace.
  Navy/blue palette. Deliberately avoid the generic "AI-generated" web look
  (gradients everywhere, emoji headers, glassmorphism, neon accents).
- Fully responsive (mobile / tablet / desktop).
- Image gallery uses a lightbox. Timeline drives the `journey` section.
- Images that are missing render a dashed placeholder box (see the CSS around line 127
  and the JS fallback around line 1189) — so a 404 image degrades gracefully.

## Running locally

Use the preview tools with the named launch config, not a raw shell command:
start the `portfolio` server from `.claude/launch.json` (serves on port 8126).

## Conventions

- Keep it a single file — do not split `index.html` into separate CSS/JS unless asked.
- New images go in `images/` and are referenced by relative path.
- Match the existing CSS variables and section structure when adding content.
- To publish changes: commit and `git push` to `main` (auto-deploys via GitHub Pages).

## Pending content (add when the user provides it)

- Class Chairperson photo — `journey-2023-chairperson.jpg` and `exp-chairperson.jpg`.
- MUN certificate image — `cert-mun.jpg`.
