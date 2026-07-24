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
    alert(res.errors);
  }
};
