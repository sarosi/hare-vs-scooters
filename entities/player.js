export function createPlayer(state) {
  state.player = {
    tag: "player",
    pos: { x: 140, y: 285 },
    vel: { x: 0, y: 0 },
    size: { w: 50, h: 50 },
    gravity: 0.8,
    jump: -15,
    grounded: true
  };

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && state.player.grounded && !state.gameOver) {
      state.player.vel.y = state.player.jump;
      state.player.grounded = false;
    }

    if (e.code === "KeyR" && state.gameOver) location.reload();
  });
}