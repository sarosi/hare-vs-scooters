import { renderEntity } from "../render/renderer.js";
import { LAYERS } from "../render/layers.js";

export function renderSystem(world, ctx, state) {
  ctx.clearRect(0, 0, 1000, 500);

  ctx.fillStyle = "#87ceeb";
  ctx.fillRect(0, 0, 1000, 500);

  ctx.fillStyle = "#444";
  ctx.fillRect(0, 330, 1000, 90);

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

  if (state.gameOver) {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, 1000, 500);

    ctx.fillStyle = "#fff";
    ctx.font = "40px Arial";
    ctx.fillText("Game Over", 400, 220);
  }
}