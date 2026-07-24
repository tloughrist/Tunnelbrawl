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
    const body = await res.json().catch(() => ({}));
    const m = Array.isArray(body.errors) ? body.errors.join(", ") : body.errors;
    alert(m || "Something went wrong updating your account.");
    return null;
  }
};
