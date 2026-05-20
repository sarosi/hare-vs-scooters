import { spawnSystem } from "../systems/spawnSystem.js";
import { movementSystem } from "../systems/movementSystem.js";
import { physicsSystem } from "../systems/physicsSystem.js";
import { animationSystem } from "../systems/animationSystem.js";
import { collisionSystem } from "../systems/collisionSystem.js";
import { renderSystem } from "../systems/renderSystem.js";
import { scooterCrashSystem }
from "../systems/scooterCrashSystem.js";

export function updateGameplay(
  world,
  state,
  player
) {
  if (!state.gameOver) {
    spawnSystem(world, state);
    physicsSystem(world, 1);
    movementSystem(world, 1);
    scooterCrashSystem(world);
    animationSystem(world, 1);
    collisionSystem(world, state, player);
  }
}

export function renderGameplay(
  world,
  ctx,
  state
) {
  renderSystem(world, ctx, state);
}