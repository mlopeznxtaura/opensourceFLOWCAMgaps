// main.js — MDP loop: motion → gesture → dsl
// 30fps, no LLM, no backend
import { processMotion } from './motion.js';
import { detectGesture } from './gesture.js';
import { selectConfig } from './dsl.js';

let currentConfig = null;

export function start(video) {
  setInterval(() => {
    const motion = processMotion(video);
    const gesture = detectGesture(motion);
    if (gesture) {
      const action = currentConfig?.gestureMap[gesture]?.[0];
      if (action) console.log('Action:', action);
    }
  }, 1000/30);
}