import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

// Hamburger menu shared by UserNav and VisitorNav. The checkbox is React-
// controlled (checked={open}) so the existing CSS :checked animation still
// works, but we can also close it on outside clicks and on link selection.
export default function NavMenu({ links }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleOutsideClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  return (
    <div>
      <nav role="navigation" ref={navRef}>
        <div id="tab"></div>
        <div id="menuToggle">
          <input
            type="checkbox"
            id="menu_actuator"
            checked={open}
            onChange={() => setOpen((o) => !o)}
          />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={pathname === to ? "navlink navlink-active" : "navlink"}
              >
                {label}
              </NavLink>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
