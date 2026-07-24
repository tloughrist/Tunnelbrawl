import { API_BASE } from '../../config.js';

export default async function leave(playerId) {
  const res = await fetch(`${API_BASE}/players/${playerId}`, {
    method: "DELETE",
    credentials: "include"
  });
  if (res.ok) {
    const pkg = await res.json();
    return pkg;
  } else {
    const body = await res.json().catch(() => ({}));
    const m = Array.isArray(body.errors) ? body.errors.join(", ") : body.errors;
    alert(m || "Something went wrong leaving the game.");
    return null;
  }
};
