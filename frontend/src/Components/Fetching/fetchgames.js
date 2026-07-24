import { API_BASE } from '../../config.js';

export default async function fetchGames(userId) {
  const response = await fetch(`${API_BASE}/users/${userId}/games`, {
    credentials: "include"
  });
  if (response.ok) {
    const pkgs = await response.json();
    return pkgs;
  } else {
    alert(response.errors);
  }
};
