import { API_BASE } from '../../config.js';

export default async function createGame(userId, title) {
  const res = await fetch(`${API_BASE}/games`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      host_id: userId,
      title: title,
      no_players: 1,
      turn: "red",
      round: 1,
      phase: "move",
      status: "pending"
    }),
    });
  if (res.ok) {
    const pkg = await res.json();
    return pkg;
  } else {
    alert(res.errors);
  }
};
