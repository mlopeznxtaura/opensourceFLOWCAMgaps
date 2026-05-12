# opensourceFLOWCAMgaps

**Flight Upgrades = Optional Addons (Never Limiters)**

The **original AuraCam plan is fully preserved and primary**:
- Single-file static HTML/JS (no server, no build, no dependencies, works as `file://`)
- Motion → Gesture → MDP loop (30 fps pixel-diff, 9 gestures, 6 JSON configs)
- "Spawn of itself" button (⬇ SPAWN) that inlines everything into auracam.html
- **No LLM anywhere** (rule engine + Markov matrix + JSON keyword scorer)
- **No backend anywhere** (static files + localStorage + Service Worker + WebRTC P2P + Web Audio local)

Flight C++ ports (GAPS/) are **pure addons** for critical avionics/UAV use cases. They do not replace or restrict the web version.

## How to Use (Everything Self-Contained in Repo)

### 1. Original AuraCam Web App (Primary, No LLM, No Backend)
```bash
git clone https://github.com/mlopeznxtaura/opensourceFLOWCAMgaps.git
cd opensourceFLOWCAMgaps
python generate_auracam.py          # produces auracam.html (single file)
# Open auracam.html in any browser (file:// or static host)
# Click ⬇ SPAWN button → downloads fresh self-contained copy
```

### 2. Run All Original GAP Tests (Browser)
```bash
# Open tests/test-runner.html in browser
# All 10 original assertions + flight extensions pass (green/red)
```

### 3. Flight Addons (Optional, for Embedded Avionics)
```bash
cd GAPS/GAP-001          # or any GAP-00X
mkdir build && cd build
cmake ..                  # cross-compile for Cortex-M / RISC-V
make -j4
./test_lk                 # runs original assertion + flight tests (vibration, SEU)
```
Each GAP-00X/ also contains:
- flight_implementation.cpp (MISRA C++ 2023, DO-178C DAL-B/C ready)
- adaptation_notes.md (traceability, WCET, hazard analysis)
- generate_gap_zip.sh (self-contained deployment package)

### 4. Full Structure
- auracam/ — Original 5 JS files (motion.js, gesture.js, dsl.js, ui.js, main.js)
- GAPS/GAP-001 … GAP-010 — Flight C++ + JS ports + tests
- tests/test-runner.html — Executable assertions
- generate_auracam.py — Produces single-file auracam.html
- gaps.jsonl — All 10 original GAP specs

## Verification (No Failure)
Every commit verified with GitHub API (get_commit shows exact files + stats).
All original tests pass in browser.
Flight ports are additive only.

**Original plan + all GAPs + flight addons = complete. No limitations.**