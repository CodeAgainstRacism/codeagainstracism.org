import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="navbar">
      {/* <h1 className="nav__brand">Code Against Racism</h1> */}
      <NavLink
        to="/"
        activeClassName="is-active"
        exact={true}
        className="nav__logo"
      >
        <h1>Code Against Racism</h1>
      </NavLink>{" "}
      <div className="nav__links">
        {/*activeClassName is only going to get applied to the link when we're on that page. */}
        <NavLink
          to="/project/new"
          activeClassName="is-active"
          exact={true}
          className="nav__item"
        >
          Create a New Project
        </NavLink>
        <NavLink
          to="/organization/new"
          activeClassName="is-active"
          exact={true}
          className="nav__item"
        >
          Create a New Organization
        </NavLink>
      </div>
    </header>
  );
}
