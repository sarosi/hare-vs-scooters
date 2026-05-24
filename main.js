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

const isMobile =
  "ontouchstart" in window;
const canvas = document.getElementById("game");
canvas.style.touchAction = "none";
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


canvas.addEventListener(
  "pointerdown",
  (e) => {
    const rect =
      canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // mute button
    if (
      x >= canvas.width - 90 &&
      x <= canvas.width - 20 &&
      y >= 20 &&
      y <= 56
    ) {
      state.muted = !state.muted;

      setMuted(state.muted);

      return;
    }


    tryJump();
  }
);


document.addEventListener(
  "keydown",
  (e) => {

    // ==============================
    // MAIN MENU
    // ==============================

    if (
      scenes.current === SCENES.MENU
    ) {

      if (e.code === "Enter") {

        unlockAudio();

        scenes.current =
          SCENES.GAME;
      }

      return;
    }

    // ==============================
    // GAMEPLAY
    // ==============================

    if (
      scenes.current === SCENES.GAME
    ) {

      // jump
      if (e.code === "Space") {
        e.preventDefault();

        tryJump();
      }

      // restart
      if (
        e.code === "KeyR" &&
        state.gameOver
      ) {
        resetGame();
      }

      // back to menu
      if (e.code === "Escape") {
        scenes.current =
          SCENES.MENU;

        resetGame();
      }

      // mute
      if (e.code === "KeyM") {
        state.muted =
          !state.muted;

        setMuted(state.muted);
      }
    }
  }
);

function tryJump() {

  if (
    state.gameOver ||
    scenes.current !== SCENES.GAME
  ) {
    return;
  }

  const vel =
    world.components.vel.get(player);

  // prevent double-jump
  if (Math.abs(vel.y) < 0.1) {

    vel.y = -11;

    unlockAudio();

    playJumpSound();
  }
}

// INPUT


function handlePointerDown(e) {

  e.preventDefault();

  unlockAudio();

  // MENU
  if (
    scenes.current === SCENES.MENU
  ) {
    scenes.current = SCENES.GAME;

    return;
  }

  // GAME OVER
  if (state.gameOver) {
    resetGame();

    return;
  }

  // GAMEPLAY
  tryJump();
}

canvas.addEventListener(
  "pointerdown",
  handlePointerDown,
  { passive: false }
);

function handleJumpInput() {
  if (state.gameOver) return;

  tryJump();
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
