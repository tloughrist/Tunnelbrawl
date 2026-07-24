import { API_BASE } from '../../config.js';

export default async function submitUser(userId, newUserObj) {
  const res = await fetch(`${API_BASE}/users/${userId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserObj),
    });
  if (res.ok) {
    const usr = await res.json();
    return usr;
  } else {
    alert(res.errors);
  }
};
