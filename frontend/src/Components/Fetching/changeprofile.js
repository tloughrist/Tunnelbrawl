import { API_BASE } from '../../config.js';

export default async function changeprofile(userId, email, pic) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      pic_url: pic,
      }),
  });
  return res;
};
