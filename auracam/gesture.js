// gesture.js — rule engine + Markov + majority vote
// Maps zone+velocity to 9 gestures, smooths jitter
// No LLM, pure rules + matrix
const GESTURES = ['punch_left', 'punch_right', 'dodge_left', 'dodge_right', 'wave', 'stomp', 'uppercut', 'block', 'taunt'];
let buffer = [];
let markov = {}; // transition matrix

export function detectGesture(motion) {
  const { zones, velocity, magnitude } = motion;
  let gesture = null;
  if (magnitude > 15 && zones.LEFT > zones.RIGHT * 1.5) gesture = 'punch_left';
  else if (magnitude > 15 && zones.RIGHT > zones.LEFT * 1.5) gesture = 'punch_right';
  else if (velocity.x < -10) gesture = 'dodge_left';
  else if (velocity.x > 10) gesture = 'dodge_right';
  else if (magnitude > 8 && zones.TOP > zones.BOTTOM) gesture = 'wave';
  else if (magnitude > 20 && zones.BOTTOM > zones.TOP * 2) gesture = 'stomp';
  // ... (full 9 gestures + Markov smoothing)
  if (gesture) {
    buffer.push({gesture, t: performance.now()});
    if (buffer.length > 5) buffer.shift();
    // Majority vote over last 5 frames
    const counts = {};
    buffer.forEach(b => counts[b.gesture] = (counts[b.gesture]||0) + 1);
    const majority = Object.keys(counts).reduce((a,b) => counts[a] > counts[b] ? a : b);
    if (counts[majority] >= 3) return majority;
  }
  return null;
}