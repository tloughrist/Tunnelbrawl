import { API_BASE } from '../../config.js';

export default async function changepassword(userId, password) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password
    }),
  });
  return res;
};
