import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h2>NotFound Path an error occured</h2>
      <h3>
        Go back to <NavLink to="/">homePage</NavLink>{" "}
      </h3>
    </div>
  );
}
