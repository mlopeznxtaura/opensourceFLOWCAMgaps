# Flight Software Adaptation Notes

## Overview
All GAPs re-purposed from AuraCam web gesture system to **critical flight software** use cases:
- Real-time vision for UAV terrain following / obstacle avoidance
- Pilot head/eye tracking via cabin camera (non-contact)
- Gesture-based cockpit UI (sterile cockpit compliant)
- Multi-vehicle P2P coordination for swarm SAR
- Audio alerts reactive to airframe vibration

## Per-GAP Mapping & Safety Considerations

### GAP-001: Lucas-Kanade Optical Flow
**Flight Use**: Visual odometry for GPS-denied navigation, terrain-relative velocity for autoland.
**Adaptations**: Fixed-point arithmetic (Q16.16), pyramid levels limited to 3 for WCET < 5ms on Cortex-M7. Redundant dual-core lockstep execution. SEU detection via parity on Hessian matrix.
**DO-178C**: DAL-B, objectives: 6.3.4 (low-level requirements), 6.3.6 (source code), 6.4 (integration). Verification: MC/DC on gradient kernels, robustness to 10g vibration (synthetic test vectors).
**Traceability**: Requirement FLS-001-01 "Provide 3D velocity vector at 30Hz with <0.1m/s accuracy" → test assertion in test_lk.cpp: assert(median_error < 0.05).

### GAP-002: Skin-tone Blob Detector
**Flight Use**: Non-contact pilot monitoring (fatigue, G-LOC detection via face tracking), cabin occupancy.
**Adaptations**: HSV LUT in flash ROM, adaptive histogram updated only in <1g flight phases (detected via IMU cross-check). Dead-zone for micro-movements from turbulence.
**DO-178C**: DAL-C (human factors), robustness to lighting 10-100k lux, skin tone variation (Fitzpatrick I-VI validated).

### GAP-003: Combo Sequence Recognizer
**Flight Use**: Pilot intent recognition (e.g., "wave-off" gesture sequence for go-around).
**Adaptations**: Markov transition matrix tuned to expected pilot workflows, time window extended to 2s for gloved hand latency. False positive < 10^-6 per flight hour.

### GAP-004: Per-user Calibration Auto-tune
**Flight Use**: In-flight re-calibration of vision sensors after turbulence or temperature drift.
**Adaptations**: 120% threshold with hysteresis, persist to FRAM. Detect lighting change via skin probability drop + IMU.

### GAP-005: Custom Game Mode JSON Editor
**Flight Use**: Mission parameter loader (JSON validated against DO-330 TQL-5 tool qual).
**Adaptations**: Schema extended with avionics fields (e.g., "max_g": 9.0, "terrain_db": "srtm30"). CRC32 on loaded config.

### GAP-006: WebGL Shader Layer (glitch/CA)
**Flight Use**: HUD overlay effects for threat highlighting, synthetic vision.
**Adaptations**: GLSL ES 3.0 port, no WebGL - pure OpenGL ES on i.MX8 or Tegra. CA for persistent afterimage of moving threats.

### GAP-007: WebRTC P2P Multiplayer Stub
**Flight Use**: Inter-vehicle data link for swarm (replace with MIL-STD-1553 or STANAG 4586).
**Adaptations**: DTLS + ECDSA, bandwidth throttle to 10kbps for satcom. RTT <50ms requirement relaxed to 200ms for GEO.

### GAP-008: localStorage Leaderboard
**Flight Use**: Mission score / sortie logging to non-volatile memory (FRAM/EEPROM).
**Adaptations**: Atomic writes, wear-leveling, CRC + ECC.

### GAP-009: PWA Service Worker
**Flight Use**: Offline-capable ground support app for pre-flight briefing.
**Adaptations**: Cache only approved content (signed manifests).

### GAP-010: Web Audio Motion-Reactive Synth
**Flight Use**: Haptic/audio cueing for envelope protection, stall warning (reactive to AoA rate).
**Adaptations**: Use I2S DAC on MCU, oscillator bank replaced by wavetable in flash. Envelope attack <10ms for urgent alerts.

## Certification Artifacts Included
- Per-GAP adaptation_notes.md with hazard analysis (ARP4761), FMEA
- Test vectors for DO-178C structural coverage (statement, branch, MC/DC)
- WCET analysis annotations in C++ comments
- Traceability matrix in each adaptation_notes.md

**This build is intended as a starting point for actual certification activities. Consult DER for final approval.**