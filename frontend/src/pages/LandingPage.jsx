import React, { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext.js' ;
import { useHistory, Link } from 'react-router-dom';
import SignIn from './SignIn';

const LandingPage = () => {
  const { user, loading} = useAuth();
  const history = useHistory();
  const [showLoginForm, setShowLoginForm] = useState(false);
  
  useEffect(() => {
    // Redirect to the profile page after 3 seconds if the user is authenticated
    if (!loading && user) {
      const redirectTimeout = setTimeout(() => {
        history.push('/profile');
      }, 3000);

      return () => clearTimeout(redirectTimeout); // Clear the timeout on component unmount
    }
  }, [loading, user, history]);

  return (
    <div className="landing-page">
      {loading ? (
        <p>Loading Sick Beats...</p>
      ) : (
        <>
          {user ? (
            // User is authenticated, show welcome message
            <div className="welcome-back">
              <h1>Welcome back to OtterCollabs, {user.username}!</h1>
              {user.imageURL && (
                <img src={user.imageURL} alt={`${user.username}'s profile`} />
              )}
              {/* Redirect to the profile page after 3 seconds */}
            </div>
          ) : (
            // User is not authenticated, show landing page content
            <div className="join-us">
              <h1>Discover the Power of Collaborative Music Creation</h1>
              <p>Join OtterCollabs and connect with musicians worldwide.</p>
              {showLoginForm ? (
                <SignIn />
              ) : (
                <>
                  <button onClick={() => setShowLoginForm(true)}>Login</button>
                  <Link to="/profile-creation">Signup</Link>
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LandingPage;