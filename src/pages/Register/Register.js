import React from "react";

import "./Register.scss";

import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [formDisplayName, setFormDisplayName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formConfirmPassword, setFormConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { registerUser, authError, authLoading } = useAuthentication();

  const formHandleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();

    setFormError("");

    const userDetails = {
      formDisplayName,
      formEmail,
      formPassword
    };

    if (formPassword !== formConfirmPassword) {
      setFormError("The Password must be the same!");
      return;
    }

    await registerUser(userDetails);
  };

  useEffect(() => {
    if (authError) {
      setFormError(authError);
    }
  }, [authError]);

  return (
    <div className="register_div">
      <h2 className="register_title">Join and Share Your Content</h2>

      <p className="register_desc">
        Build Your Profile and Share Your Stories
      </p>

      <form onSubmit={formHandleSubmit} className="register_form">
        <label className="register_label" htmlFor="">
          <span className="register_label_span">Username:</span>

          <input
            className="register_input"
            type="text"
            name="formDisplayName"
            required
            placeholder="Enter Your Username"
            value={formDisplayName}
            onChange={(changeEvent) =>
              setFormDisplayName(changeEvent.target.value)
            }
          />
        </label>

        <label className="register_label" htmlFor="">
          <span className="register_label_span">Email Address:</span>

          <input
            className="register_input"
            type="mail"
            name="Email"
            required
            placeholder="Enter Your Email Address"
            value={formEmail}
            onChange={(changeEvent) => setFormEmail(changeEvent.target.value)}
          />
        </label>

        <label className="register_label" htmlFor="">
          <span className="register_label_span">Create a Password:</span>

          <input
            className="register_input"
            type="password"
            name="secretCode"
            required
            placeholder="Enter a Strong Password"
            minLength={8}
            value={formPassword}
            onChange={(changeEvent) =>
              setFormPassword(changeEvent.target.value)
            }
          />
        </label>

        <label className="register_label" htmlFor="">
          <span className="register_label_span">Confirm Your Password:</span>

          <input
            className="register_input"
            type="password"
            name="ConfirmSecretCode"
            required
            placeholder="Confirm Your Password"
            minLength={8}
            value={formConfirmPassword}
            onChange={(changeEvent) =>
              setFormConfirmPassword(changeEvent.target.value)
            }
          />
        </label>

        {!authLoading && <button className="signup_button">Sign Up</button>}
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

export default Register;
