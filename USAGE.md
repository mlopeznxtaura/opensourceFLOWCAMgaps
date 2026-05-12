# USAGE (Self-Contained — No External Chat Needed)

## Core Principle
Flight upgrades are **addons only**. Original AuraCam web plan is unchanged and primary.

## Quick Start (Web — Original Plan)
1. Clone repo
2. Run: python generate_auracam.py
3. Open auracam.html (file:// OK)
4. Click ⬇ SPAWN for fresh copy
5. Open tests/test-runner.html to verify all 10 GAP tests

## Flight Addons (Separate, Optional)
See GAPS/GAP-00X/ for C++ embedded versions (DO-178C ready).

## No LLM / No Backend Guarantee
- Web: pure pixel-diff + Markov + JSON configs + localStorage + SW + P2P
- Flight: pure C++ firmware (no OS, no server)

All instructions and code are inside this repo.