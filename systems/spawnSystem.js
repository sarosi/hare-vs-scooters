import { createEntity } from "../ecs/entity.js";
import { addComponent } from "../ecs/components.js";

function getDifficulty(state) {
  const elapsed = (performance.now() - state.startTime) / 1000;

  return {
    speedBoost: Math.min(elapsed * 0.04, 4),
    spawnReduction: Math.min(elapsed * 12, 700)
  };
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function spawnSystem(world, state) {
  const now = performance.now();

  if (now - state.lastSpawn < state.nextSpawnDelay) {
    return;
  }

  const diff = getDifficulty(state);

  // progressively faster scooters
  const speed =
    -(4.5 + randomRange(0, 2) + diff.speedBoost);

  const id = createEntity(world);

  addComponent(world, id, "pos", {
    x: 1100,
    y: 340
  });

  addComponent(world, id, "vel", {
    x: speed,
    y: 0
  });

  addComponent(world, id, "size", {
    w: 120,
    h: 40
  });

  addComponent(world, id, "render", {
    type: "scooter",
    layer: "world",
    z: 0
  });

  addComponent(world, id, "scooter");

  // --- RANDOMIZED NEXT SPAWN ---
  const baseDelay = 1400 - diff.spawnReduction;

  state.nextSpawnDelay = Math.max(
    550,
    baseDelay + randomRange(-250, 350)
  );

  state.lastSpawn = now;
}