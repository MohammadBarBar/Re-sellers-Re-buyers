import React from "react";
import "./navigation.css";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <NavLink className="links" to="home">
        Home
      </NavLink>
      {/* <NavLink className="links" to="addreSellerReBuyer">
        Add Record
      </NavLink> */}
    </nav>
  );
}

export default Navigation;
