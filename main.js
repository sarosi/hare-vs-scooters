import { createWorld } from "./ecs/world.js";
import { createEntity } from "./ecs/entity.js";
import { addComponent } from "./ecs/components.js";

import { spawnSystem } from "./systems/spawnSystem.js";
import { movementSystem } from "./systems/movementSystem.js";
import { physicsSystem } from "./systems/physicsSystem.js";
import { animationSystem } from "./systems/animationSystem.js";
import { collisionSystem } from "./systems/collisionSystem.js";
import { renderSystem } from "./systems/renderSystem.js";
import { unlockAudio } from "./audio/sounds.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const world = createWorld();

const state = {
  score: 0,
  lives: 3,
  gameOver: false,
  lastSpawn: 0,
  startTime: performance.now(),
  nextSpawnDelay: 1400
};

// PLAYER
const player = createEntity(world);

addComponent(world, player, "pos", { x: 140, y: 250 });
addComponent(world, player, "vel", { x: 0, y: 0 });
addComponent(world, player, "size", { w: 50, h: 50 });
addComponent(world, player, "gravity", 0.8);

addComponent(world, player, "render", {
  type: "hare",
  layer: "world",
  z: 1
});

addComponent(world, player, "animation", {
  current: "idle",
  frame: 0,
  timer: 0,
  clips: {
    idle: { frames: [0,1,2], speed: 0.2 },
    jump: { frames: [3,4,5], speed: 0.1 }
  }
});

// INPUT
document.addEventListener("keydown", async (e) => {
  await unlockAudio();

  const vel = world.components.vel.get(player);

  if (e.code === "Space") {
    vel.y = -15;
  }

  if (e.code === "KeyR" && state.gameOver) {
    location.reload();
  }
});

function loop() {
  if (!state.gameOver) {
    spawnSystem(world, state);
    physicsSystem(world, 1);
    movementSystem(world, 1);
    animationSystem(world, 1);
    collisionSystem(world, state, player);
  }

  renderSystem(world, ctx, state);

  requestAnimationFrame(loop);
}

loop();