import { API_BASE } from '../../config.js';

export default async function joinGame(game_id, user_id) {
  const response = await fetch(`${API_BASE}/players`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user_id,
      game_id: game_id,
    }),
  });
  const publicGames = await response.json();
  return publicGames;
};
