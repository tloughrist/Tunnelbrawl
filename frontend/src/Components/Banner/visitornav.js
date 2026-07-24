import React from "react";
import { NavLink, useLocation } from "react-router-dom";

function VisitorNav() {
  return (
    <div>
      <nav role="navigation">
        <div id="tab"></div>
        <div id="menuToggle">
          <input type="checkbox" id="menu_actuator" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <NavLink to="/home" className={useLocation().pathname === "/home" ? "navlink navlink-active" : "navlink"}>Home</NavLink>
            <NavLink to="/login" className={useLocation().pathname === "/login" ? "navlink navlink-active" : "navlink"}>Login</NavLink>
            <NavLink to="/signup" className={useLocation().pathname === "/signup" ? "navlink navlink-active" : "navlink"}>Signup</NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default VisitorNav;