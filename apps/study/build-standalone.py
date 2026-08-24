#!/usr/bin/env python3
"""Build the standalone, downloadable copy of the study app.

    python3 apps/study/build-standalone.py

Reads apps/study/index.html and writes apps/study/olevel-hq.html: one file with
no server behind it, no service worker and no external requests, which runs by
double-clicking it. Everything the hosted copy loads from a sibling file — the
manifest, the icons, sw.js — is either inlined or dropped.

The app's fonts are already embedded as base64 in index.html, so there is
nothing to fetch at runtime. Progress is saved to localStorage, which does
persist for file:// pages; the footer's Back up / Restore buttons move it
between browsers and devices.
"""

import base64, pathlib, re, sys

HERE = pathlib.Path(__file__).resolve().parent
SRC  = HERE / 'index.html'
OUT  = HERE / 'olevel-hq.html'

html = SRC.read_text(encoding='utf-8')
before = len(html)


def once(pattern, repl, why, count=1, flags=0):
    """Apply a substitution that must match exactly `count` times."""
    global html
    n = len(re.findall(pattern, html, flags))
    if n != count:
        sys.exit('FAILED (%s): expected %d match(es), found %d for %r' % (why, count, n, pattern))
    html = re.sub(pattern, repl, html, flags=flags)


# 1. Mark the build as standalone. The page uses this to drop the update
#    controls and skip every network check.
once(r"const STANDALONE = false;", "const STANDALONE = true;", 'standalone flag')

# 2. The favicon becomes a data URI so the tab still has an icon offline;
#    the manifest and the remaining icon links refer to files that will not
#    travel with a single downloaded file, so they go.
icon = HERE / 'icons' / 'icon-192.png'
if icon.exists():
    b64 = base64.b64encode(icon.read_bytes()).decode('ascii')
    once(r'<link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192\.png" />',
         '<link rel="icon" type="image/png" href="data:image/png;base64,%s" />' % b64,
         'inline favicon')
else:
    once(r'<link rel="icon" type="image/png" sizes="192x192" href="icons/icon-192\.png" />\n', '', 'drop 192 icon')

once(r'<link rel="manifest" href="manifest\.webmanifest" />\n', '', 'drop manifest')
once(r'<link rel="icon" type="image/png" sizes="512x512" href="icons/icon-512\.png" />\n', '', 'drop 512 icon')
once(r'<link rel="apple-touch-icon" href="icons/apple-touch-icon\.png" />\n', '', 'drop apple icon')

# 3. The "← Portfolio" link points at a sibling page that is not part of the
#    download, and the install affordance — button and its Add to Dock panel —
#    belongs to the installable web copy. A file:// page cannot be installed,
#    so the whole block goes rather than offering steps that lead nowhere.
once(r'\s*<a class="home-link" href="\.\./index\.html">← Portfolio</a>', '', 'drop portfolio link')
once(r'\s*<div class="install" id="install">\s*'
     r'<button class="install-btn" id="installBtn" type="button" aria-expanded="false">'
     r'Install app</button>\s*'
     r'<div class="install-how" id="installHow" hidden></div>\s*</div>', '', 'drop install block')

# 4. Title, so a downloaded file is recognisable in a folder and in the tab.
once(r'<title>[^<]*</title>', '<title>O-Level HQ — offline copy</title>', 'title')

OUT.write_text(html, encoding='utf-8')

build = re.search(r"const BUILD = '([^']+)'", html).group(1)
print('built %s' % OUT.name)
print('  build   %s (standalone)' % build)
print('  size    %.2f MB  (source %.2f MB)' % (len(html) / 1048576, before / 1048576))

leftover = [m for m in re.findall(r'(?:src|href)="([^"]+)"', html)
            if not m.startswith(('data:', '#', 'http'))]
print('  external file references: %s' % (', '.join(sorted(set(leftover))) if leftover else 'none'))
if leftover:
    sys.exit('FAILED: the standalone file still points at files that will not travel with it')
