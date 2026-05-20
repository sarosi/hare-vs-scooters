import { query } from "../ecs/query.js";

export function movementSystem(world, dt) {
  const ents = query(world, ["pos", "vel"]);

  for (const id of ents) {
    const p = world.components.pos.get(id);
    const v = world.components.vel.get(id);

    p.x += v.x * dt;
    p.y += v.y * dt;
  }
}