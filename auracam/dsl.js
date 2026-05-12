// dsl.js — keyword scorer to 6 JSON game configs
// No LLM, pure string match + JSON
const CONFIGS = {
  shadowbox: { name: 'Shadowbox', gestureMap: { punch_left: [{name:'spawn', type:'enemy', color:'red'}] }, spawnConfig: {rate: 2}, effects: ['glitch'] },
  dodge: { name: 'Dodge', gestureMap: { dodge_left: [{name:'dodge', fx:'blur'}] }, spawnConfig: {rate: 1}, effects: [] },
  wave: { name: 'Wave', gestureMap: { wave: [{name:'powerup'}] }, spawnConfig: {rate: 0.5}, effects: ['ca'] },
  stomp: { name: 'Stomp', gestureMap: { stomp: [{name:'quake'}] }, spawnConfig: {rate: 3}, effects: [] },
  pose: { name: 'Pose', gestureMap: { block: [{name:'shield'}] }, spawnConfig: {rate: 1}, effects: [] },
  speed: { name: 'Speed', gestureMap: { punch_right: [{name:'boost'}] }, spawnConfig: {rate: 4}, effects: ['glitch'] }
};

export function selectConfig(prompt) {
  const lower = prompt.toLowerCase();
  for (const [key, cfg] of Object.entries(CONFIGS)) {
    if (lower.includes(key) || lower.includes(cfg.name.toLowerCase())) return cfg;
  }
  return CONFIGS.shadowbox; // default
}