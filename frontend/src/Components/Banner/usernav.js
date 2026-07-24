import React from "react";
import NavMenu from "./navmenu.js";

function UserNav() {
  return (
    <NavMenu
      links={[
        { to: "/home", label: "Home" },
        { to: "/games", label: "Games" },
        { to: "/taproom", label: "Taproom" },
        { to: "/profile", label: "Profile" },
      ]}
    />
  );
};

export default UserNav;
