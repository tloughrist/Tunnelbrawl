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
    alert(res.errors);
  }
};
