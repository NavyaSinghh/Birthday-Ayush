const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawHeart(x, y, size, angle, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = color;
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(0, topCurveHeight);
  // Left half of heart
  ctx.bezierCurveTo(
    0, 0,
    -size / 2, 0,
    -size / 2, topCurveHeight
  );
  ctx.bezierCurveTo(
    -size / 2, size / 2,
    0, size / 1.2,
    0, size
  );
  // Right half of heart
  ctx.bezierCurveTo(
    0, size / 1.2,
    size / 2, size / 2,
    size / 2, topCurveHeight
  );
  ctx.bezierCurveTo(
    size / 2, 0,
    0, 0,
    0, topCurveHeight
  );
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

const colors = ['#FF5C5C', '#FFBD4C', '#8AFF6F', '#5CD1FF', '#FF5CDA'];

const confetti = Array.from({ length: 120 }).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 12 + 8,
  angle: Math.random() * Math.PI * 2,
  rotationSpeed: (Math.random() - 0.5) * 0.1, // twist speed
  speedY: Math.random() * 2 + 1,              // falling speed
  color: colors[Math.floor(Math.random() * colors.length)],
}));

function update() {
  confetti.forEach(c => {
    c.y += c.speedY;
    c.angle += c.rotationSpeed;
    if (c.y > canvas.height + c.size) {
      c.y = -c.size;
      c.x = Math.random() * canvas.width;
    }
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    drawHeart(c.x, c.y, c.size, c.angle, c.color);
  });
  update();
}

setInterval(drawConfetti, 33);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
