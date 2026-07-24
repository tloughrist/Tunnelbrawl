import React, { useState } from "react";
import swal from 'sweetalert';
import login from '../Fetching/login.js';

function Login({ onLogin }) {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
      e.preventDefault();
      const res = await login(username, password);
      const user = await res.json();
      if (user.errors) {
        swal("Incorrect username/password");
      } else {
        onLogin(user);
      }
    };
    
    return (
      <div className="card" id="login_card">
        <div id="login_card_top">
          <div className="brand-logo"></div>
        </div>
        <div id="login_card_bottom">
          <form id="login" onSubmit={handleSubmit}>
            <label htmlFor="username">
              username
              <input
                type="text"
                name="username"
                value={username}
                className="non_card_input"
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label htmlFor="password">
              password
              <input
                type="password"
                name="password"
                autoComplete="password"
                value={password}
                className="non_card_input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button className="navlink" type="submit">login</button>
          </form>
        </div>
      </div>
    );
};

export default Login;