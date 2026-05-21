import { query } from "../ecs/query.js";
import {
  playJumpSound,
  playMissSound,
  playGameOverSound,
  playCarrotSound
} from "../audio/sounds.js";
import {
  saveHighScore
} from "../utils/highscore.js";
import {
  handleGameOver
} from "../game/gameOver.js";

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
      // mark scooter as falling and caught (for score)
      world.components.caught.add(id);
      world.components.falling.add(id);

      playJumpSound();
      state.score++;
      state.highScore = saveHighScore(
        state.score
      );

      if (world.components.carrotCarrier.has(id)) {
        playCarrotSound();
        state.lives++;
        //document.getElementById("lives").textContent = state.lives;
      } 

      //document.getElementById("score").textContent = state.score;

      // bounce upward
      pVel.y = -10;

      // fall scooter
      // already falling? skip
      if (world.components.falling.has(id) || world.components.caught.has(id)) {
        continue;
      }

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
    const alreadyCaught =
      world.components.caught.has(id);

    const falling =
      world.components.falling.has(id);

    if (
      sPos.x + sSize.w < -50 &&
      !alreadyCaught &&
      !falling
    ) {
      state.lives--;
      playMissSound();

      //document.getElementById("lives").textContent = state.lives;

      // remove scooter
      world.entities.delete(id);

      for (const key in world.components) {
        const c = world.components[key];

        if (c instanceof Map) c.delete(id);
        else c.delete(id);
      }

      // --- GAME OVER ---
      if (state.lives <= 0) {
        handleGameOver(state);
        playGameOverSound();
      }
    }
  }
}
