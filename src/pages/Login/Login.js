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
    <div className="login_container">
      <h2 className="login_title">Login to Your Account</h2>
  
      <p className="login_desc">Login to unlock exclusive content.</p>
  
      <form className="login_form" onSubmit={formHandleSubmit}>
        <label className="login_label" htmlFor="">
          <span className="login_label_span">Email:</span>
  
          <input
            className="login_input"
            type="mail"
            name="Email"
            required
            placeholder="Enter Your Email Address"
            value={formEmail}
            onChange={(changeEvent) => setFormEmail(changeEvent.target.value)}
          />
        </label>
  
        <label className="login_label" htmlFor="">
          <span className="login_label_span">Password:</span>
  
          <input
            className="login_input"
            type="password"
            name="secretCode"
            required
            placeholder="Enter Your Password"
            minLength={8}
            value={formPassword}
            onChange={(changeEvent) =>
              setFormPassword(changeEvent.target.value)
            }
          />
        </label>
  
        {!authLoading && <button className="login_button">LogIn</button>}
        {authLoading && (
          <button className="login_button" disabled>
            Loading...
          </button>
        )}
        {formError && <p className="login_error">{formError}</p>}
      </form>
    </div>
  );  
};

export default Login;
