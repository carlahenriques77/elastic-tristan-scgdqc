import React from "react";

import "./Login.scss";

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
      formPassword
    };

    await loginUser(userDetails);
  };

  useEffect(() => {
    if (authError) {
      setFormError(authError);
    }
  }, [authError]);

  return (
    <div className="register_div">
      <h2 className="register_title">LogIn to Upload</h2>

      <p className="register_desc">LogIn and Share your Histories</p>

      <form className="register_form" onSubmit={formHandleSubmit}>
        <label className="register_label" htmlFor="">
          <span className="register_label_span">Email:</span>

          <input
            className="register_input"
            type="mail"
            name="Email"
            required
            placeholder="XXX@gmail.com"
            value={formEmail}
            onChange={(changeEvent) => setFormEmail(changeEvent.target.value)}
          />
        </label>

        <label className="register_label" htmlFor="">
          <span className="register_label_span">Password:</span>

          <input
            className="register_input"
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

        {!authLoading && <button className="signup_button">LogIn</button>}
        {authLoading && (
          <button className="signup_button" disabled>
            Loading...
          </button>
        )}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Login;
