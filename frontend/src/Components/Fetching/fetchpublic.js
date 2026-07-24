import { API_BASE } from '../../config.js';

export default async function fetchPublic(user_id) {
  const response = await fetch(`${API_BASE}/games/public/${user_id}`, {
    credentials: "include"
  });
  if (response.ok) {
    const pkgs = await response.json();
    return pkgs;
  } else {
    return [];
  }
};
