import React from "react";

import styles from "./Navbar.module.scss";

import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useAuthValue();

  const { logoutUser } = useAuthentication();

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/About"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            About
          </NavLink>
        </li>
        {currentUser && (
          <>
          <li>
            <NavLink
              to="/Posts/Create"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              CreatePost
            </NavLink>
          </li>
          </>
        )}
        {!currentUser && (
          <>
            <li>
              <NavLink
                to="/Register"
                className={({ isActive }) =>
                  isActive
                    ? styles.active + " " + styles.smallButton
                    : styles.smallButton
                }
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Login"
                className={({ isActive }) =>
                  isActive
                    ? styles.active + " " + styles.smallButton
                    : styles.smallButton
                }
              >
                Login
              </NavLink>
            </li>
          </>
        )}
        {currentUser && (
          <>
            <li>
              <button onClick={logoutUser} className={styles.smallButton}>
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
