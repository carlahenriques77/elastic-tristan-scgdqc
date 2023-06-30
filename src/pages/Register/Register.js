import React from "react";
import "./Register.scss";
import { useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import useAllFormFields from "../../hooks/useAllFormFields";

const Register = () => {
  const {
    formDisplayName,
    formEmail,
    formPassword,
    formConfirmPassword,
    formAuthError,
    setFormAuthError,
    handleDisplayNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = useAllFormFields();

  const { registerUser, authError, authLoading } = useAuthentication();

  const formHandleSubmit = async (submitEvent) => {
    submitEvent.preventDefault();

    setFormAuthError("");

    const userDetails = {
      formDisplayName,
      formEmail,
      formPassword,
    };

    if (formPassword !== formConfirmPassword) {
      setFormAuthError("The Password must be the same!");
      return;
    }

    await registerUser(userDetails);
  };

  useEffect(() => {
    if (authError) {
      setFormAuthError(authError);
    }
  }, [authError, setFormAuthError]);

  return (
    <div className="register_div">
      <h2 className="register_title">Join and Share Your Content</h2>

      <p className="register_desc">Build Your Profile and Share Your Stories</p>

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
            onChange={handleDisplayNameChange}
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
            onChange={handleEmailChange}
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
            onChange={handlePasswordChange}
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
            onChange={handleConfirmPasswordChange}
          />
        </label>

        {!authLoading && <button className="signup_button">Sign Up</button>}
        {authLoading && (
          <button className="signup_button" disabled>
            Loading...
          </button>
        )}
        {formAuthError && <p className="error">{formAuthError}</p>}
      </form>
    </div>
  );
};

export default Register;
