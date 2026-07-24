import { API_BASE } from '../../config.js';

export default async function signup(username, email, profilePic, password) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      pic_url: profilePic,
      password: password
      }),
  });
  return res;
};
