import { renderEntity } from "../render/renderer.js";
import { drawEnvironment } from "../render/draw/environment.js";
import { query } from "../ecs/query.js";

export function renderSystem(world, ctx, state) {
  const canvas = ctx.canvas;

  // ==================================================
  // FRAME RESET
  // ==================================================

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  // ==================================================
  // WORLD PASS
  // ==================================================

  ctx.save();

  drawEnvironment(ctx);

  const layers = {
    background: [],
    world: [],
    foreground: [],
    ui: []
  };

  for (const id of world.entities) {
    const render =
      world.components.render.get(id);

    if (!render) continue;

    layers[render.layer].push(id);
  }

  // z-sort
  for (const key in layers) {
    layers[key].sort((a, b) => {
      const ra =
        world.components.render.get(a);

      const rb =
        world.components.render.get(b);

      return (ra.z || 0) - (rb.z || 0);
    });
  }

  // render gameplay entities
  for (const id of layers.world) {
    renderEntity(ctx, world, id);
  }

  ctx.restore();

  // ==================================================
  // RESET BEFORE UI
  // ==================================================

  ctx.setTransform(1, 0, 0, 1, 0, 0);

  const uiScale =
    canvas.clientWidth / canvas.width;

  // ==================================================
  // HUD
  // ==================================================

  ctx.fillStyle = "#3f2b0c";

  ctx.font =
    `${Math.floor(24 * uiScale)}px Arial`;

  ctx.textAlign = "left";

  ctx.fillText(
    `Score: ${state.score}`,
    20,
    40
  );

  ctx.fillText(
    `Lives: ${state.lives}`,
    20,
    75
  );

  ctx.fillText(
    `High Score: ${state.highScore}`,
    20,
    110
  );

  // ==================================================
  // MUTE BUTTON
  // ==================================================

  ctx.fillStyle =
    "rgba(0,0,0,0.45)";

  ctx.fillRect(
    canvas.width - 90,
    20,
    70,
    36
  );

  ctx.strokeStyle = "#fff";

  ctx.strokeRect(
    canvas.width - 90,
    20,
    70,
    36
  );

  ctx.fillStyle = "#fff";

  ctx.font =
    `${Math.floor(18 * uiScale)}px Arial`;

  ctx.fillText(
    state.muted ? "🔇" : "🔊",
    canvas.width - 68,
    45
  );

  // ==================================================
// PAUSE BUTTON
// ==================================================

ctx.fillStyle =
  "rgba(0,0,0,0.45)";

ctx.fillRect(
  canvas.width - 200,
  20,
  90,
  40
);

ctx.strokeStyle = "#fff";

ctx.strokeRect(
  canvas.width - 200,
  20,
  90,
  40
);

ctx.fillStyle = "#fff";

ctx.font =
  `${Math.floor(18 * uiScale)}px Arial`;

ctx.textAlign = "center";

ctx.fillText(
  state.paused ? "RESUME" : "PAUSE",
  canvas.width - 155,
  46
);

// ==================================================
// QUIT BUTTON
// ==================================================

ctx.fillStyle =
  "rgba(0,0,0,0.45)";

ctx.fillRect(
  canvas.width - 310,
  20,
  90,
  40
);

ctx.strokeStyle = "#fff";

ctx.strokeRect(
  canvas.width - 310,
  20,
  90,
  40
);

ctx.fillStyle = "#fff";

ctx.fillText(
  "QUIT",
  canvas.width - 265,
  46
);

ctx.textAlign = "left";

  // ==================================================
  // GAME OVER OVERLAY
  // ==================================================

  if (state.gameOver) {
    const panelWidth = 480;
    const panelHeight = 320;

    const panelX =
      canvas.width / 2 -
      panelWidth / 2;

    const panelY =
      canvas.height / 2 -
      panelHeight / 2;

    // dark overlay
    ctx.fillStyle =
      "rgba(0,0,0,0.72)";

    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    // panel
    ctx.fillStyle =
      "rgba(255,255,255,0.08)";

    ctx.fillRect(
      panelX,
      panelY,
      panelWidth,
      panelHeight
    );

    ctx.strokeStyle =
      "rgba(255,255,255,0.2)";

    ctx.lineWidth = 2;

    ctx.strokeRect(
      panelX,
      panelY,
      panelWidth,
      panelHeight
    );

    ctx.textAlign = "center";

    // title
    ctx.fillStyle = "#fff";

    ctx.font =
      `${Math.floor(46 * uiScale)}px Arial`;

    ctx.fillText(
      "GAME OVER",
      canvas.width / 2,
      panelY + 60
    );

    // score
    ctx.font =
      `${Math.floor(28 * uiScale)}px Arial`;

    ctx.fillText(
      `Your Score: ${state.score}`,
      canvas.width / 2,
      panelY + 120
    );

    ctx.font =
      `${Math.floor(22 * uiScale)}px Arial`;

    ctx.fillText(
      `High Score: ${state.highScore}`,
      canvas.width / 2,
      panelY + 155
    );

    // new high score
    if (
      state.score >= state.highScore
    ) {
      ctx.fillStyle = "#ffd54a";

      ctx.font =
        `${Math.floor(32 * uiScale)}px Arial`;

      ctx.fillText(
        "NEW HIGH SCORE!",
        canvas.width / 2,
        panelY + 200
      );
    }

    // submission status
    if (state.submittingScore) {
      ctx.fillStyle = "#fff";

      ctx.font =
        `${Math.floor(18 * uiScale)}px Arial`;

      ctx.fillText(
        "Submitting score...",
        canvas.width / 2,
        panelY + 230
      );
    }

    // instructions
    ctx.fillStyle = "#fff";

    ctx.font =
      `${Math.floor(20 * uiScale)}px Arial`;

    ctx.fillText(
      "Press R to Restart",
      canvas.width / 2,
      panelY + 260
    );

    ctx.fillText(
      "Press ESC for Menu",
      canvas.width / 2,
      panelY + 290
    );

    // leaderboard
    if (
      state.leaderboard &&
      state.leaderboard.length > 0
    ) {
      ctx.font =
        `${Math.floor(18 * uiScale)}px Arial`;

      ctx.fillText(
        "TOP PLAYERS",
        canvas.width / 2,
        panelY + 340
      );

      state.leaderboard
        .slice(0, 5)
        .forEach((entry, index) => {
          ctx.fillText(
            `${index + 1}. ${entry.player_name} - ${entry.score}`,
            canvas.width / 2,
            panelY + 370 + index * 26
          );
        });
    }

    ctx.textAlign = "left";
  }

  if (
  state.paused &&
  !state.gameOver
) {
  ctx.fillStyle =
    "rgba(0,0,0,0.5)";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.fillStyle = "#fff";

  ctx.textAlign = "center";

  ctx.font =
    `${Math.floor(48 * uiScale)}px Arial`;

  ctx.fillText(
    "PAUSED",
    canvas.width / 2,
    canvas.height / 2
  );

  ctx.font =
    `${Math.floor(22 * uiScale)}px Arial`;

  ctx.fillText(
    "Press P or Tap Pause",
    canvas.width / 2,
    canvas.height / 2 + 50
  );

  ctx.textAlign = "left";
}
}