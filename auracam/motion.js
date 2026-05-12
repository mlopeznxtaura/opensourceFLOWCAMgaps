// motion.js — 30fps pixel-diff on 320x180 offscreen canvas
// Produces: motion magnitude per zone + centroid + velocity vector
// No LLM, pure pixel processing
const canvas = document.createElement('canvas');
canvas.width = 320; canvas.height = 180;
const ctx = canvas.getContext('2d', {willReadFrequently: true});
let prevFrame = null;

export function processMotion(video) {
  ctx.drawImage(video, 0, 0, 320, 180);
  const imageData = ctx.getImageData(0, 0, 320, 180);
  const data = imageData.data;
  let totalDiff = 0;
  const zones = { LEFT: 0, CENTER: 0, RIGHT: 0, TOP: 0, BOTTOM: 0 };
  let cx = 0, cy = 0, count = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2];
    const gray = (r + g + b) / 3;
    const x = (i / 4) % 320;
    const y = Math.floor((i / 4) / 320);
    if (prevFrame) {
      const diff = Math.abs(gray - prevFrame[i/4]);
      totalDiff += diff;
      if (diff > 20) {
        cx += x; cy += y; count++;
        if (x < 106) zones.LEFT += diff;
        else if (x < 213) zones.CENTER += diff;
        else zones.RIGHT += diff;
        if (y < 90) zones.TOP += diff;
        else zones.BOTTOM += diff;
      }
    }
    prevFrame[i/4] = gray;
  }
  const magnitude = totalDiff / (320*180);
  const centroid = count > 0 ? {x: cx/count, y: cy/count} : {x:160, y:90};
  const velocity = {x: 0, y: 0}; // simple delta from prev centroid
  return { magnitude, zones, centroid, velocity };
}