import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username && password) {
            alert('Sign In successful!');
        } else {
            alert('Please enter both username and password!');
        }
    };

    return (
        <div className="SignIn">
          <h1 className="OtterCollab">OtterCollab</h1>
          <form onSubmit={handleSubmit}>
            <div className="email-box">
              <label htmlFor="emailInput">Email: </label>
              <input
                id="emailInput"
                type="text"
                placeholder="Email"
              />
            </div>
            <div>
              <label htmlFor="passwordInput">Password: </label>
              <input
                id="passwordInput"
                type="password"
                placeholder="Password"
              />
            </div>
            <div>
              <button type="submit" className="action-button">
                Sign In
              </button>
            </div>
          </form>
          <p>
            Not on OtterCollab? <Link to="/NewUser">Create Account</Link>
          </p>
        </div>
      );
};

export default SignIn;