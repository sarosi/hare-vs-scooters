export function renderMainMenu(ctx) {
  // sky
  ctx.fillStyle = "#87ceeb";
  ctx.fillRect(0, 0, 1000, 500);

  // ground
  ctx.fillStyle = "#3f8f3f";
  ctx.fillRect(0, 340, 1000, 160);

  // title
  ctx.fillStyle = "#fff";
  ctx.font = "bold 56px Arial";
  ctx.textAlign = "center";

  ctx.fillText(
    "HARE SCOOTER CHAOS",
    500,
    140
  );

  // subtitle
  ctx.font = "24px Arial";

  ctx.fillText(
    "Jump on scooters to score points",
    500,
    190
  );

  // instructions panel
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.fillRect(280, 230, 440, 160);

  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.strokeRect(280, 230, 440, 160);

  ctx.fillStyle = "#fff";
  ctx.font = "22px Arial";

  ctx.fillText("SPACE → Jump", 500, 280);
  ctx.fillText("Catch scooters from above", 500, 320);
  ctx.fillText("You can miss 3 scooters", 500, 360);

  // blinking start text
  const blink = Math.sin(performance.now() * 0.005);

  if (blink > 0) {
    ctx.font = "bold 30px Arial";
    ctx.fillText("PRESS ENTER TO START", 500, 450);
  }

  ctx.textAlign = "left";
}