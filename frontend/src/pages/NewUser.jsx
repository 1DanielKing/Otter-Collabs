import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  const checkUserExists = async (email) => {
    try {
      const response = await fetch(`/api/users/search?email=${email}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log(data);
      return data.isPresent();
    } catch (error) {
      console.error("Error checking user:", error.message);
      return false;
    }
  };

  const checkUserExists2 = async (email) => {
    try {
      const response = await fetch(`/api/users/search?email=${email}`);
      if (response.ok) {
        return true;
      } else if (response.status === 404) {
        return false;
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error checking user:", error.message);
      return false;
    }
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
    const userExists = await checkUserExists(userEmail);
    if (!userExists) {
      navigate("/profile-creation", {
        state: { userEmail, userPassword },
      });
    } else {
      alert("Account already exists please log in.");
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
