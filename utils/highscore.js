const KEY = "hare_scooter_highscore";

export function loadHighScore() {
  const value = localStorage.getItem(KEY);

  return value ? Number(value) : 0;
}

export function saveHighScore(score) {
  const current = loadHighScore();

  if (score > current) {
    localStorage.setItem(KEY, score);
    return score;
  }

  return current;
}