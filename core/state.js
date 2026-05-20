export const state = {
  score: 0,
  lives: 3,
  gameOver: false,

  entities: [],
  startTime: Date.now(),
  lastSpawn: 0,

  canvas: null,
  ctx: null
};