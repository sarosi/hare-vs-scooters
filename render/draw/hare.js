export function drawHare(ctx, pos, size, anim) {
  ctx.save();

  const bounce = anim
    ? Math.sin(anim.frame * 0.8) * 2
    : 0;

  // --- TAIL ---
  ctx.fillStyle = "#d9c6a5";

  ctx.beginPath();
  ctx.arc(
    pos.x + 4,
    pos.y + 30 + bounce,
    7,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // --- BODY ---
  ctx.fillStyle = "#d9c6a5";

  ctx.beginPath();
  ctx.ellipse(
    pos.x + 25,
    pos.y + 30 + bounce,
    22,
    18,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // --- HEAD ---
  ctx.beginPath();
  ctx.arc(
    pos.x + 38,
    pos.y + 14 + bounce,
    14,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // --- EARS ---
  ctx.fillRect(
    pos.x + 28,
    pos.y - 20 + bounce,
    6,
    28
  );

  ctx.fillRect(
    pos.x + 40,
    pos.y - 24 + bounce,
    6,
    32
  );

  // inner ears
  ctx.fillStyle = "#f2a7b8";

  ctx.fillRect(
    pos.x + 30,
    pos.y - 16 + bounce,
    2,
    18
  );

  ctx.fillRect(
    pos.x + 42,
    pos.y - 20 + bounce,
    2,
    22
  );

  // --- EYE ---
  ctx.fillStyle = "#111";

  ctx.beginPath();
  ctx.arc(
    pos.x + 42,
    pos.y + 12 + bounce,
    2.5,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.restore();
}