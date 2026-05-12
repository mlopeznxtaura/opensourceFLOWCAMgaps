# GAP-001: Lucas-Kanade Optical Flow for Flight Software

Adapted for UAV Visual Odometry and Terrain Navigation.

## Flight Adaptation
Replaces pixel tracking with feature tracking for position estimation in GPS-denied environments.

## Files
- lk_optical_flow.cpp : Core C++ implementation
- test_lk.cpp : DO-178C style unit tests
- CMakeLists.txt

Full implementation follows the original sequence_instructions with safety additions.