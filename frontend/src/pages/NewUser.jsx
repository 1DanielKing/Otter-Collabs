import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddFriendModal from '../components/AddFriendModal.jsx'

const NewUser = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const handleUserInput = async (event) => {
    event.preventDefault();
    if (
      !userEmail.includes("@") &&
      !userEmail.includes(".com") &&
      !userEmail.includes(".org") &&
      !userEmail.includes(".edu")
    ) {
      alert("Must be a valid email address");
      return;
    }
    if (userPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    try {
      // will attempt to save username and password in data base then let user continue with account creation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirects to the user profile page upon successful account creation
      navigate("/profile-creation", {
        state: { userEmail, userPassword },
      });
    } catch (error) {
      console.error("Error creating user:", error.message);
      // Handle errors from the API call
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
      <AddFriendModal></AddFriendModal>
    </div>
  );
};

export default NewUser;
