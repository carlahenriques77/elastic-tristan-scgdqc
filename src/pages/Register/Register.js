import React from "react";

// import / style
import styles from "./Register.module.scss";

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
      formPassword,
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
    <div className={styles.registerDiv}>
      <h2>SignUp to Upload</h2>

      <p>Create your Account and Share your Histories</p>

      <form onSubmit={formHandleSubmit}>
        <label htmlFor="">
          <span>Name:</span>

          <input
            type="text"
            name="formDisplayName"
            required
            placeholder="UserName"
            value={formDisplayName}
            onChange={(changeEvent) =>
              setFormDisplayName(changeEvent.target.value)
            }
          />
        </label>

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

        <label htmlFor="">
          <span>Confirm Password:</span>

          <input
            type="password"
            name="ConfirmSecretCode"
            required
            placeholder="Confirm your Password"
            minLength={8}
            value={formConfirmPassword}
            onChange={(changeEvent) =>
              setFormConfirmPassword(changeEvent.target.value)
            }
          />
        </label>

        {!authLoading && <button className="btn">signUp</button>}
        {authLoading && <button className="btn" disabled>Loading...</button>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Register;
