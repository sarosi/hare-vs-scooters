export function drawHare(ctx, pos, size, anim) {
  ctx.fillStyle = "#d9c6a5";

  ctx.beginPath();
  ctx.ellipse(pos.x + 25, pos.y + 30, 22, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(pos.x + 38, pos.y + 14, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillRect(pos.x + 28, pos.y - 20, 6, 28);
  ctx.fillRect(pos.x + 40, pos.y - 24, 6, 32);
}