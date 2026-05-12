// ui.js — canvas, buttons, spawn
export function setupUI(onGesture, onSpawn) {
  const btn = document.createElement('button');
  btn.textContent = '⬇ SPAWN';
  btn.onclick = () => {
    const html = generateSelfContained();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([html], {type:'text/html'}));
    a.download = 'auracam.html';
    a.click();
  };
  document.body.appendChild(btn);
  // video + canvas setup
}