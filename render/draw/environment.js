export function drawEnvironment(ctx) {
  // --- SKY ---
  ctx.fillStyle = "#87ceeb";
  ctx.fillRect(0, 0, 1000, 500);

  // --- SUN ---
  ctx.fillStyle = "#ffd54a";

  ctx.beginPath();
  ctx.arc(850, 90, 45, 0, Math.PI * 2);
  ctx.fill();

  // --- CLOUDS ---
  drawCloud(ctx, 120, 80);
  drawCloud(ctx, 320, 120);
  drawCloud(ctx, 620, 70);

  // --- ROAD ---
  ctx.fillStyle = "#444";
  ctx.fillRect(0, 330, 1000, 90);

  ctx.fillStyle = "#2f9e44";
  ctx.fillRect(0, 420, 1000, 80);

  // road stripe
  ctx.fillStyle = "#ddd";

  for (let i = 0; i < 1000; i += 80) {
    ctx.fillRect(i, 370, 40, 6);
  }

  // --- FOREGROUND BUSHES ---
  for (let i = 0; i < 1000; i += 70) {
    drawBush(ctx, i, 330);
  }
}

function drawCloud(ctx, x, y) {
  ctx.fillStyle = "rgba(255,255,255,0.95)";

  ctx.beginPath();
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.arc(x + 30, y - 10, 30, 0, Math.PI * 2);
  ctx.arc(x + 60, y, 24, 0, Math.PI * 2);
  ctx.fill();
}

function drawBush(ctx, x, y) {
  ctx.fillStyle = "#2f9e44";

  ctx.beginPath();
  ctx.arc(x + 10, y, 18, Math.PI, 0);
  ctx.arc(x + 30, y - 8, 22, Math.PI, 0);
  ctx.arc(x + 52, y, 18, Math.PI, 0);

  ctx.fill();
}