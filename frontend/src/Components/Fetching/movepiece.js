import { API_BASE } from '../../config.js';

export default async function movepiece(boardId, activePiece, spaceId) {
  const res = await fetch(`${API_BASE}/boards/move_piece/${boardId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      start_loc: `loc${activePiece}`,
      end_loc: `loc${spaceId}`
    })
  });
  return res;
};
