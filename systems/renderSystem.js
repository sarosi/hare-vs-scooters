import { renderEntity } from "../render/renderer.js";
import { drawEnvironment } from "../render/draw/environment.js";

export function renderSystem(world, ctx, state) {
  ctx.clearRect(0, 0, 1000, 500);

  // environment
  drawEnvironment(ctx);

  const layers = {
    background: [],
    world: [],
    foreground: [],
    ui: []
  };

  for (const id of world.entities) {
    const r = world.components.render.get(id);

    if (!r) continue;

    layers[r.layer].push(id);
  }

  for (const key in layers) {
    layers[key].sort((a, b) => {
      const ra = world.components.render.get(a);
      const rb = world.components.render.get(b);

      return (ra.z || 0) - (rb.z || 0);
    });
  }

  for (const id of layers.world) {
    renderEntity(ctx, world, id);
  }

  // --- UI ---
  if (state.gameOver) {
  // dark overlay
    ctx.fillStyle = "rgba(0,0,0,0.72)";
    ctx.fillRect(0, 0, 1000, 500);

    // panel
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(260, 120, 480, 240);

    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 2;
    ctx.strokeRect(260, 120, 480, 240);

    // title
    ctx.fillStyle = "#fff";
    ctx.font = "bold 46px Arial";
    ctx.textAlign = "center";

    ctx.fillText("GAME OVER", 500, 180);

    // score
    ctx.font = "28px Arial";

    ctx.fillText(
      `Final Score: ${state.score}`,
      500,
      235
    );

    // instructions
    ctx.font = "20px Arial";

    ctx.fillText(
      "Press R to Restart",
      500,
      290
    );

    ctx.fillText(
      "Press F5 to Reload Everything",
      500,
      325
    );

    // small footer
    ctx.font = "16px Arial";
    ctx.fillStyle = "rgba(255,255,255,0.7)";

    ctx.fillText(
      "The scooters finally escaped the bunny.",
      500,
      355
    );

    ctx.textAlign = "left";
}
}