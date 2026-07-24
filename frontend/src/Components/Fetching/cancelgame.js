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
    alert(res.errors);
  }
};
