import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.js' ;
import { useNavigate, Link } from 'react-router-dom';
import SignIn from './SignIn';

const LandingPage = () => {
  const { user, loading} = useAuth();
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  
  useEffect(() => {
    // Redirect to the profile page after 3 seconds if the user is authenticated
    if (!loading && user) {
      const redirectTimeout = setTimeout(() => {
        navigate.push('/profile');
      }, 3000);

      return () => clearTimeout(redirectTimeout); // Clear the timeout on component unmount
    }
  }, [loading, user, navigate]);

  return (
    <div className="SignIn">
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
                  <Link to="/new-user">Signup</Link>
                </>
              )}
              <p>
OtterCollab is a cutting-edge platform designed for musicians seeking a collaborative and immersive music creation experience. Uniting artists worldwide, OtterCollab fosters a unique space where creativity thrives through real-time collaboration, allowing users to seamlessly connect, compose, and produce music together. With its intuitive interface, diverse collaboration tools, and a vibrant community, OtterCollab stands out as the go-to destination for musicians aspiring to transcend geographical boundaries and elevate their collaborative music-making journey. Join OtterCollab and unlock the power of global collaboration in music creation like never before.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LandingPage;