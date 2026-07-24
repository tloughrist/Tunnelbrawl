import { API_BASE } from '../../config.js';

export default async function cancel(gameId) {
  const res = await fetch(`${API_BASE}/games/${gameId}`, {
    method: "DELETE",
    credentials: "include"
  });
  if (res.ok) {
    const pkg = await res.json();
    return pkg;
  } else {
    const body = await res.json().catch(() => ({}));
    const m = Array.isArray(body.errors) ? body.errors.join(", ") : body.errors;
    alert(m || "Something went wrong canceling the game.");
    return null;
  }
};
