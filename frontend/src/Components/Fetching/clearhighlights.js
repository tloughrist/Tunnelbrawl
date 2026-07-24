import { API_BASE } from '../../config.js';

export default async function clearhighlights(boardId) {
  const res = await fetch(`${API_BASE}/boards/clear_highlights/${boardId}`, {
    method: "PUT",
    credentials: "include",
  });
  return res;
};
