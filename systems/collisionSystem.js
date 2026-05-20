import { query } from "../ecs/query.js";
import {
  playJumpSound,
  playMissSound,
  playGameOverSound
} from "../audio/sounds.js";

export function collisionSystem(world, state, playerId) {
  const scooters = query(world, ["pos", "size", "scooter"]);

  const pPos = world.components.pos.get(playerId);
  const pSize = world.components.size.get(playerId);
  const pVel = world.components.vel.get(playerId);

  const hareBottom = pPos.y + pSize.h;

  for (const id of scooters) {
    const sPos = world.components.pos.get(id);
    const sSize = world.components.size.get(id);

    // collision from above
    const hit =
      pVel.y > 0 &&
      hareBottom >= sPos.y - 25 &&
      hareBottom <= sPos.y + 40 &&
      pPos.x + pSize.w > sPos.x + 20 &&
      pPos.x < sPos.x + sSize.w - 20;

    // --- SUCCESSFUL HIT ---
    if (hit) {
      playJumpSound();
      state.score++;

      document.getElementById("score").textContent = state.score;

      // bounce upward
      pVel.y = -12;

      // fall scooter
      // already falling? skip
      if (world.components.falling.has(id)) {
        continue;
      }

      // mark scooter as falling
      world.components.falling.add(id);

      const vel = world.components.vel.get(id);

      vel.x *= 0.4;
      vel.y = -8;

      world.components.angularVelocity.set(
        id,
        0.15
      );

      continue;
    }

    // --- MISSED SCOOTER ---
    if (sPos.x + sSize.w < 0) {
      state.lives--;
      playMissSound();

      document.getElementById("lives").textContent = state.lives;

      // remove scooter
      world.entities.delete(id);

      for (const key in world.components) {
        const c = world.components[key];

        if (c instanceof Map) c.delete(id);
        else c.delete(id);
      }

      // --- GAME OVER ---
      if (state.lives <= 0) {
        state.gameOver = true;
        playGameOverSound();
      }
    }
  }
}