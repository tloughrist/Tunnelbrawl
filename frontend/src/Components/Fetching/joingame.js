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
  if (response.ok) {
    return await response.json();
  }
  const body = await response.json().catch(() => ({}));
  const message = Array.isArray(body.errors) ? body.errors.join(", ") : body.errors;
  alert(message || "Could not join the game.");
  return null;
};
