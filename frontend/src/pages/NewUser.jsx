import { useState, useEffect } from "react";

const NewUser = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const handleUserInput = () => {
    //todo check if account with email exists
    if (userPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
  };

  return (
    <div>
      <h1>Create Account Page</h1>
      <form onSubmit={handleUserInput}>
        <div className="email-box">
          <label htmlFor="emailInput">Email: </label>
          <input
            id="emailInput"
            type="text"
            value={userEmail}
            onChange={handleEmailChange}
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="passwordInput">Password: </label>
          <input
            id="passwordInput"
            type="password"
            value={userPassword}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </div>
        <div>
          <button type="submit" className="action-button">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
