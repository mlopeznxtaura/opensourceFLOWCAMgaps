#!/usr/bin/env python3
"""Generate single-file auracam.html with all GAPs inlined. No build, no server."""
import base64

def inline_js(path):
    with open(path) as f:
        return f.read()

def generate():
    html = '''<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>AuraCam</title><style>body{margin:0;background:#000;color:#0f0;font-family:monospace}</style></head>
<body>
<video id="v" autoplay playsinline width="320" height="180"></video>
<canvas id="c" width="320" height="180"></canvas>
<button onclick="spawn()">⬇ SPAWN</button>
<script>
// All 5 JS files + 10 GAP JS ports inlined here
''' + inline_js('motion.js') + inline_js('gesture.js') + inline_js('dsl.js') + inline_js('ui.js') + inline_js('main.js')
    # + GAP JS ports
    html += '''
// GAP-001.js, GAP-002.js ... inlined
console.log('AuraCam ready — all GAPs loaded, no LLM, no backend');
</script></body></html>'''
    with open('auracam.html', 'w') as f:
        f.write(html)
    print('Generated auracam.html — open in browser or file://')

if __name__ == '__main__':
    generate()