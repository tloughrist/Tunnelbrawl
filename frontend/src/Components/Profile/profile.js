import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import { LoggedInContext, UserContext } from '../../App.js';
import { API_BASE } from '../../config.js';
import changeprofile from '../Fetching/changeprofile.js';
import changepassword from '../Fetching/changepassword.js';

function Profile({ setUser, logout }) {
    
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const isLoggedIn = useContext(LoggedInContext);
  const user = useContext(UserContext);

  const navigate = useNavigate();
    
  useEffect(() => {
    function setStates() {
      setEmail(user.email);
      setPic(user.pic_url);
      setIsLoaded(true);
    };
    if (user) {
      setStates();
    }
  }, [user]);

  useEffect(() => {
    function sendHome(logStatus) {
      if (logStatus === false) {
        navigate("/home");
      }
    }
    sendHome(isLoggedIn);
  }, [isLoggedIn, navigate])

  async function handleLogout() {
    await fetch(`${API_BASE}/logout`, {
      method: "DELETE",
      credentials: "include"
    });
    swal("You've been logged out.")
    logout();
  };

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete your account?")) {
      await fetch(`${API_BASE}/users/${user.id}`, {
        method: "DELETE",
        credentials: "include"
      });
      swal("Your account has been deleted.")
      logout();
    }
  };

  async function handleProfileChange(e) {
    e.preventDefault();
    const usr = await changeprofile(user.id, email, pic);
    if (!usr) return;
    setUser(usr);
  };

  async function handlePasswordChange(e) {
    e.preventDefault();
    const usr = await changepassword(user.id, password);
    if (!usr) return;
    setUser(usr);
  };

  return (
    <div className="container">
      {
        isLoaded?
          <div className="card" id="profile_card">
            <div className="brand-logo"></div>
            <h2>username</h2>
            <p><b>{user.username}</b></p>
            <div className="side-by-side_container">
              <div className="side-by-side_element">
                <h2>change profile</h2>
                <form className="stacked_element" onSubmit={handleProfileChange}>
                  <label htmlFor="email">
                      <p><b>email</b></p>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      placeholder={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </label>
                  <label htmlFor="pic">
                    <p><b>profile pic</b></p>
                    <input
                      type="url"
                      name="pic"
                      value={pic}
                      placeholder={pic}
                      onChange={(e) => setPic(e.target.value)}
                    />
                  </label>
                  <input
                    type="submit"
                    value="submit profile"
                    className="navlink"
                  />
                </form>
              </div>
              <div className="side-by-side_element">
                <h2>change password</h2>
                <form className="stacked_element" onSubmit={handlePasswordChange}>
                  <input
                    type="text"
                    className="hidden"
                    autoComplete="username"
                  />
                  <label htmlFor="password">
                    <p><b>new password</b></p>
                    <p className="subtext">(eight character minimum)</p>
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  </label>
                  <label htmlFor="passwordConfirmation">
                    <p><b>confirm new password</b></p>
                    <input
                      type="password"
                      name="passwordConfirmation"
                      autoComplete="new-password-confirmation"
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                  </label>
                  <input
                    type="submit"
                    value="submit password"
                    className="navlink"
                  />
                </form>
                <div className="stacked_element">
                  <h2>manage account</h2>
                  <button onClick={e => handleLogout()} className="navlink">logout</button>
                  <button onClick={e => handleDelete()} className="navlink">delete account</button>
                </div>
              </div>
            </div>
          </div>
        : <p>Loading...</p>
      }
    </div>
  );
};

export default Profile;