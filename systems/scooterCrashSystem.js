import { query } from "../ecs/query.js";

export function scooterCrashSystem(world) {
  const fallingScooters = query(world, [
    "falling",
    "pos",
    "vel",
    "rotation",
    "angularVelocity"
  ]);

  for (const id of fallingScooters) {
    const pos = world.components.pos.get(id);
    const vel = world.components.vel.get(id);

    let rot = world.components.rotation.get(id);
    let angVel =
      world.components.angularVelocity.get(id);

    // falling motion
    vel.y += 0.7;

    // spin
    angVel += 0.02;
    rot += angVel;

    world.components.rotation.set(id, rot);
    world.components.angularVelocity.set(id, angVel);

    // remove after leaving screen
    if (pos.y > 700) {
      world.entities.delete(id);

      for (const key in world.components) {
        const c = world.components[key];

        if (c instanceof Map) c.delete(id);
        else c.delete(id);
      }
    }
  }
}