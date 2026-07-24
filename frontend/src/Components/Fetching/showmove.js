import { API_BASE } from '../../config.js';

export default async function showmove(boardId, spaceId) {
  const res = await fetch(`${API_BASE}/boards/show_moves/${boardId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      active_piece: `loc${spaceId}`
    }),
  });
  return res;
};
