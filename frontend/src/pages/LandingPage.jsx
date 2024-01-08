import React, { useState, useEffect } from 'react';
import { useAuth } from '../path-to-your-auth-provider';
import { useHistory } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const { user, loading } = useAuth();
  const history = useHistory();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Redirect to the profile page after 3 seconds if the user is authenticated
    if (!loading && user) {
      const redirectTimeout = setTimeout(() => {
        history.push('/profile');
      }, 3000);

      return () => clearTimeout(redirectTimeout); // Clear the timeout on component unmount
    }
  }, [loading, user, history]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      setError(null);
      // Call the login function with the entered username and password
      await login(username, password);
      // Redirect to the profile page after successful login
      history.push('/profile');
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Incorrect login information. Please try again.');
    }
  };

  return (
    <div className="landing-page">
      {loading ? (
        <p> Loading Sick Beats...</p>

      ):(

        <>
        {user ? (
        // User is authenticated, show welcome message
        <div className='welcome-back'>
          <h1>Welcome back to OtterCollabs, {user.username}!</h1>
          {user.imageURL && <img src={user.imageURL} alt={`${user.username}'s profile`} />} 
        {/* Redirect to the profile page after 3 seconds */}
        </div>

      ) : (

        // User is not authenticated, show landing page content
                    <div className='join-us'>
              <h1>Discover the Power of Collaborative Music Creation</h1>
              <p>Join OtterCollabs and connect with musicians worldwide.</p>
              {showLoginForm ? (
                <form onSubmit={handleLoginSubmit}>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button type="submit">Login</button>
                </form>
              ) : (
                <button onClick={() => setShowLoginForm(true)}>Login</button>
              )}
              <Link to="/newuser">Signup</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LandingPage;