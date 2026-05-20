import { query } from "../ecs/query.js";

const GROUND_Y = 285;

export function physicsSystem(world, dt) {
  const ents = query(world, ["pos", "vel", "gravity"]);

  for (const id of ents) {
    const p = world.components.pos.get(id);
    const v = world.components.vel.get(id);
    const g = world.components.gravity.get(id);
    const size = world.components.size.get(id);

    // gravity
    v.y += g * dt;

    // apply vertical movement
    p.y += v.y * dt;

    // --- GROUND COLLISION ---
    if (p.y > GROUND_Y) {
      p.y = GROUND_Y;
      v.y = 0;
    }
  }
}