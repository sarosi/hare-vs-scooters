export function drawScooter(
  ctx,
  pos,
  size,
  anim,
  rotation = 0
) {
  ctx.save();
  ctx.translate(
    pos.x + size.w / 2,
    pos.y + size.h / 2
  );

  ctx.rotate(rotation);

  ctx.translate(
    -(pos.x + size.w / 2),
    -(pos.y + size.h / 2)
  );

  // mirror scooter direction
  ctx.translate(pos.x + size.w / 2, 0);
  ctx.scale(-1, 1);
  ctx.translate(-(pos.x + size.w / 2), 0);

  // --- SCOOTER BODY ---
  ctx.fillStyle = "#ff5252";

  // deck
  ctx.fillRect(pos.x + 20, pos.y + 8, 60, 10);

  // handle pole
  ctx.fillRect(pos.x + 65, pos.y - 15, 5, 25);

  // handlebar
  ctx.fillRect(pos.x + 55, pos.y - 18, 20, 4);

  // seat/body
  ctx.fillRect(pos.x + 38, pos.y - 2, 18, 10);

  // --- WHEELS ---
  ctx.fillStyle = "#222";

  ctx.beginPath();
  ctx.arc(pos.x + 28, pos.y + 26, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(pos.x + 76, pos.y + 26, 12, 0, Math.PI * 2);
  ctx.fill();

  // --- RIDER ---
  // body
  ctx.fillStyle = "#3f51b5";
  ctx.fillRect(pos.x + 42, pos.y - 28, 16, 36);

  // head
  ctx.fillStyle = "#f1c27d";
  ctx.beginPath();
  ctx.arc(pos.x + 50, pos.y - 38, 10, 0, Math.PI * 2);
  ctx.fill();

  // legs
  /*ctx.strokeStyle = "#222";
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(pos.x + 46, pos.y);
  ctx.lineTo(pos.x + 36, pos.y + 18);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(pos.x + 54, pos.y);
  ctx.lineTo(pos.x + 66, pos.y + 18);
  ctx.stroke();*/

  // arms
  ctx.beginPath();
  ctx.moveTo(pos.x + 46, pos.y - 18);
  ctx.lineTo(pos.x + 62, pos.y - 10);
  ctx.stroke();

  ctx.restore();
}