const SUPABASE_URL = "YOUR_SUPABASE_URL";

const SUPABASE_KEY = "YOUR_ANON_KEY";

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json"
};

export async function submitScore(
  playerName,
  score
) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/leaderboard`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({
        player_name: playerName,
        score
      })
    }
  );

  return response.ok;
}

export async function fetchLeaderboard() {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/leaderboard?select=player_name,score&order=score.desc&limit=10`,
    {
      headers
    }
  );

  return await response.json();
}