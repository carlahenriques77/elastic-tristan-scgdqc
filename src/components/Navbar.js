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
            className={({ isActive }) =>
              isActive ? "active button_style_1" : "button_style_1"
            }
          >
            Home
          </NavLink>
        </li>
        <li className="nav_li_link">
          <NavLink
            to="/About"
            className={({ isActive }) =>
              isActive ? "active button_style_1" : "button_style_1"
            }
          >
            About
          </NavLink>
        </li>
        {currentUser && (
          <>
            <li className="nav_li_link">
              <NavLink
                to="/Dashboard"
                className={({ isActive }) =>
                  isActive ? "active button_style_1" : "button_style_1"
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li className="nav_li_link">
              <NavLink
                to="/Posts/Create"
                className={({ isActive }) =>
                  isActive ? "active button_style_1" : "button_style_1"
                }
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
                to="/Login"
                className={({ isActive }) =>
                  isActive
                    ? "active button_style_1 small_button"
                    : "button_style_1 small_button"
                }
              >
                Login
              </NavLink>
            </li>
            <li className="nav_li_link">
              <NavLink
                to="/Register"
                className={({ isActive }) =>
                  isActive
                    ? "active button_style_1 small_button"
                    : "button_style_1 small_button"
                }
              >
                Register
              </NavLink>
            </li>
          </>
        )}
        {currentUser && (
          <>
            <li className="nav_li_link">
              <button
                onClick={logoutUser}
                className="button_style_1 small_button"
              >
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
