import { drawHare } from "./draw/hare.js";
import { drawScooter } from "./draw/scooter.js";

export function renderEntity(ctx, world, id) {
  const r = world.components.render.get(id);
  const pos = world.components.pos.get(id);
  const size = world.components.size.get(id);
  const anim = world.components.animation?.get?.(id);

  if (!r || !pos || !size) return;

  switch (r.type) {
    case "hare":
      drawHare(ctx, pos, size, anim);
      break;

    case "scooter":
      const rotation =
        world.components.rotation?.get?.(id) || 0;

        const hasCarrot = world.components.carrotCarrier?.has(id);
        drawScooter(
            ctx,
            pos,
            size,
            anim,
            rotation,
            hasCarrot
        );
      break;
  }
}