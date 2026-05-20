export function scooterSystem(state) {
  for (const s of state.entities) {
    if (s.tag !== "scooter") continue;

    s.pos.x += s.vel.x;

    if (s.falling) {
      s.rotation += 0.12;
      s.pos.y += s.fallSpeed;
      s.fallSpeed += 0.4;
    }
  }
}