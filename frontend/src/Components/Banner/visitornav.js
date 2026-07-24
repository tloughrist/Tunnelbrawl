import React from "react";
import NavMenu from "./navmenu.js";

function VisitorNav() {
  return (
    <NavMenu
      links={[
        { to: "/home", label: "Home" },
        { to: "/login", label: "Login" },
        { to: "/signup", label: "Signup" },
      ]}
    />
  );
};

export default VisitorNav;
