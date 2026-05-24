import { createWorld } from "./ecs/world.js";
import { createEntity } from "./ecs/entity.js";
import { addComponent } from "./ecs/components.js";
import { unlockAudio } from "./audio/sounds.js";
import {
  createSceneManager,
  SCENES
} from "./scenes/sceneManager.js";
import {
  renderMainMenu
} from "./scenes/mainMenuScene.js";
import {
  updateGameplay,
  renderGameplay
} from "./scenes/gameplayScene.js";
import {
  loadHighScore
} from "./utils/highscore.js";
import {
  fetchLeaderboard,
  submitScore
} from "./services/leaderboard.js";
import { setMuted } from "./audio/sounds.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

async function loadLeaderboard() {
  state.leaderboard = await fetchLeaderboard();
}

loadLeaderboard();

const state = {
  score: 0,
  highscore: loadHighScore(),
  leaderboard: [],
  playerName: "PLAYER",
  lives: 3,
  gameOver: false,
  lastSpawn: 0,
  startTime: performance.now(),
  nextSpawnDelay: 1400,
  muted: false,
};

const world = createWorld();
const scenes = createSceneManager();


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

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();

  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // mute button bounds
  if (
    mouseX >= 900 &&
    mouseX <= 970 &&
    mouseY >= 20 &&
    mouseY <= 56
  ) {
    state.muted = !state.muted;

    setMuted(state.muted);
  }
});

// INPUT
  document.addEventListener("keydown", async (e) => {
    await unlockAudio();

    // --- MENU ---
    if (
      scenes.current === SCENES.MENU &&
      e.code === "Enter"
    ) {
      // ask once if no player name
    if (
      !state.playerName ||
      state.playerName === "PLAYER"
    ) {
      const name = prompt(
        "Enter your name:"
      );

      if (name && name.trim()) {
        state.playerName = name
          .replace(/[^a-z0-9 ]/gi, "")
          .trim()
          .substring(0, 12);
      }
    }

      scenes.current = SCENES.GAME;
      return;
    }

    // --- GAMEPLAY ---
  if (scenes.current === SCENES.GAME) {
    const vel = world.components.vel.get(player);

    if (
      e.code === "Space" &&
      Math.abs(vel.y) < 0.1
    ) {
      vel.y = -11;
    }

    if (
      e.code === "KeyR" &&
      state.gameOver
    ) {
      resetGame();
    }

    // back to menu
    if (e.code === "Escape") {
      scenes.current = SCENES.MENU;
      resetGame();
    }
  }
});

canvas.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();

    if (state.gameOver) {
      return;
    }

    jump(world);
  },
  { passive: false }
);

function handleJumpInput() {
  if (state.gameOver) return;

  jump(world);
}

document.addEventListener(
  "visibilitychange",
  () => {
    if (document.hidden) {
      state.paused = true;
    }
  }
);

  function resetGame() {
    // remove all scooter entities
    for (const id of [...world.entities]) {
      if (id === player) continue;

      world.entities.delete(id);

      for (const key in world.components) {
        const c = world.components[key];

        if (c instanceof Map) c.delete(id);
        else c.delete(id);
      }
    }

    // reset player
    const pPos = world.components.pos.get(player);
    const pVel = world.components.vel.get(player);

    pPos.x = 140;
    pPos.y = 285;

    pVel.x = 0;
    pVel.y = 0;

    // reset state
    state.score = 0;
    state.lives = 3;
    state.gameOver = false;

    state.lastSpawn = 0;
    state.startTime = performance.now();

    document.getElementById("score").textContent = 0;
    document.getElementById("lives").textContent = 3;
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- MAIN MENU ---
    if (scenes.current === SCENES.MENU) {
      renderMainMenu(ctx);
    }

    // --- GAMEPLAY ---
    if (scenes.current === SCENES.GAME) {
      updateGameplay(world, state, player);
      renderGameplay(world, ctx, state);
    }

    requestAnimationFrame(loop);
  }

  loop();
