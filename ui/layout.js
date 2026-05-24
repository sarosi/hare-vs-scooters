export function getSafeTop() {
  const isLandscapeMobile =
    window.innerWidth >
      window.innerHeight &&
    "ontouchstart" in window;

  return isLandscapeMobile
    ? 50
    : 0;
}

export function getUILayout(canvas) {

  const top = getSafeTop();

  return {

    // ==========================================
    // HUD
    // ==========================================

    score: {
      x: 20,
      y: 40 + top
    },

    lives: {
      x: 20,
      y: 75 + top
    },

    highScore: {
      x: 20,
      y: 110 + top
    },

    // ==========================================
    // BUTTONS
    // ==========================================

    mute: {
      x: canvas.width - 90,
      y: 20 + top,
      w: 70,
      h: 36
    },

    pause: {
      x: canvas.width - 200,
      y: 20 + top,
      w: 90,
      h: 40
    },

    quit: {
      x: canvas.width - 310,
      y: 20 + top,
      w: 90,
      h: 40
    }
  };
}