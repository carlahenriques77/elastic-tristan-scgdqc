import React from "react";

import "./Navbar.scss";

import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useAuthValue();

  const { logoutUser } = useAuthentication();

  return (
    <nav className="navbar_div">
      <NavLink className="website_brand_title" to="/">
        Mini <span className="miniblog_span">Blog</span>
      </NavLink>
      <ul className="navbar_links_list">
        <li className="nav_li_link">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li className="nav_li_link">
          <NavLink
            to="/About"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </li>
        {currentUser && (
          <>
          <li className="nav_li_link">
            <NavLink
              to="/Posts/Create"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              CreatePost
            </NavLink>
          </li>
          </>
        )}
        {!currentUser && (
          <>
            <li className="nav_li_link">
              <NavLink
                to="/Register"
                className={({ isActive }) =>
                  isActive
                    ? "active" + " " + "smallButton"
                    : "smallButton"
                }
              >
                Register
              </NavLink>
            </li>
            <li className="nav_li_link">
              <NavLink
                to="/Login"
                className={({ isActive }) =>
                  isActive
                    ? "active" + "smallButton"
                    : "smallButton"
                }
              >
                Login
              </NavLink>
            </li>
          </>
        )}
        {currentUser && (
          <>
            <li className="nav_li_link">
              <button onClick={logoutUser} className="small_button">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
