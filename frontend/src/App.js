import './App.css';
import React, { createContext, useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { API_BASE } from "./config.js";
import Banner from "./Components/Banner/banner.js";
import Games from "./Components/Games/games.js";
import Home from "./Components/Home/home.js";
import Login from "./Components/Logging/login.js";
import Signup from "./Components/Logging/signup.js";
import Profile from "./Components/Profile/profile.js";
import Taproom from "./Components/Taproom/taproom.js";

const LoggedInContext = createContext();
const UserContext = createContext();
 
export { LoggedInContext, UserContext };

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${API_BASE}/me`, {
        credentials: "include"
      });
      if (response.ok) {
        const usr = await response.json();
        setUser(usr);
        setIsLoggedIn(true);
       } else {
        setIsLoggedIn(false);
      }
    };
    fetchData();
  }, []);

  function onLogin(usr) {
    setUser(usr);
    setIsLoggedIn(true);
    navigate("/home");
  };

  function logout() {
    navigate("/home");
    setUser({});
    setIsLoggedIn(false);
  };

  return (
    <LoggedInContext.Provider value={isLoggedIn}>
      <UserContext.Provider value={user}>
        <div className="App">
          <Banner />
          <div id="content_panel">
            <Routes>
              <Route path="/games" element={<Games />} />
              <Route path="/login" element={<Login
                onLogin={onLogin}
              />} />
              <Route path="/signup" element={<Signup
                onLogin={onLogin}
              />} />
              <Route path="/profile" element={<Profile
                setUser={setUser}
                logout={logout}
              />} />
              <Route path="/taproom" element={<Taproom />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </div>
      </UserContext.Provider>
    </LoggedInContext.Provider>
  );
};

export default App;