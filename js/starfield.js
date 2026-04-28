const sCanvas = document.getElementById('stars-canvas');
const sCtx = sCanvas.getContext('2d');
let starList = [];

function resizeStars() {
  sCanvas.width = window.innerWidth;
  sCanvas.height = window.innerHeight;
}

function initStars() {
  starList = [];
  for (let i = 0; i < 220; i++) {
    starList.push({
      x: Math.random() * sCanvas.width,
      y: Math.random() * sCanvas.height,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random(),
      da: (Math.random() - 0.5) * 0.012
    });
  }
}

function drawStars() {
  sCtx.clearRect(0, 0, sCanvas.width, sCanvas.height);
  starList.forEach(s => {
    s.a += s.da;
    if (s.a <= 0 || s.a >= 1) s.da *= -1;
    sCtx.beginPath();
    sCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    sCtx.fillStyle = `rgba(255,255,255,${s.a * 0.65})`;
    sCtx.fill();
  });
  requestAnimationFrame(drawStars);
}