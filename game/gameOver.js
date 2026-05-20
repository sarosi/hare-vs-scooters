import {
  submitScore,
  fetchLeaderboard
} from "../services/leaderboard.js";

export async function handleGameOver(state) {
  // prevent duplicate calls
  if (state.gameOver) {
    return;
  }

  state.gameOver = true;

  try {
    // optional minimum score
    if (state.score >= 1) {
      await submitScore(
        state.playerName,
        state.score
      );
    }

    // refresh leaderboard
    state.leaderboard =
      await fetchLeaderboard();
  } catch (err) {
    console.error(
      "Leaderboard submission failed:",
      err
    );
  }
}