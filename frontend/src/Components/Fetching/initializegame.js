import { API_BASE } from '../../config.js';

export default async function initialize(gameId, gameUpdateObj) {
  const res = await fetch(`${API_BASE}/games/initialize/${gameId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(gameUpdateObj),
  });
  if (res.ok) {
    const pkg = await res.json();
    return pkg;
  } else {
    const body = await res.json().catch(() => ({}));
    const m = Array.isArray(body.errors) ? body.errors.join(", ") : body.errors;
    alert(m || "Something went wrong updating the game.");
    return null;
  }
};
