import React from "react";

import styles from "./Login.module.scss";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { loginUser, authError, authLoading } = useAuthentication();

  const formHandleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();

    setFormError("");

    const userDetails = {
      formEmail,
      formPassword,
    };

    await loginUser(userDetails);
  };

  useEffect(() => {
    if (authError) {
      setFormError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h2>LogIn to Upload</h2>

      <p>LogIn and Share your Histories</p>

      <form onSubmit={formHandleSubmit}>
        <label htmlFor="">
          <span>Email:</span>

          <input
            type="mail"
            name="Email"
            required
            placeholder="XXX@gmail.com"
            value={formEmail}
            onChange={(changeEvent) => setFormEmail(changeEvent.target.value)}
          />
        </label>

        <label htmlFor="">
          <span>Password:</span>

          <input
            type="password"
            name="secretCode"
            required
            placeholder="********"
            minLength={8}
            value={formPassword}
            onChange={(changeEvent) =>
              setFormPassword(changeEvent.target.value)
            }
          />
        </label>

        {!authLoading && <button className="btn">LogIn</button>}
        {authLoading && (
          <button className="btn" disabled>
            Loading...
          </button>
        )}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Login;
