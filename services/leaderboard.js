const SUPABASE_URL = "https://cwbhedgrwpbzsifkjnft.supabase.co/rest/v1/";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YmhlZGdyd3BienNpZmtqbmZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMDM4MDQsImV4cCI6MjA5NDg3OTgwNH0.DSRSI3PKUAcKVl3zdr6Kg3eDIydHfNFxgfnWzCFXBDE";

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