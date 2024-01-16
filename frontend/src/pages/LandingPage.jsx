import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import { useNavigate, Link } from 'react-router-dom';
import SignIn from './SignIn';
import NewUser from './NewUser'; // Import the NewUser component

const LandingPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    // Redirect to the profile page after 3 seconds if the user is authenticated
    if (!loading && user) {
      const redirectTimeout = setTimeout(() => {
        navigate.push('/profile');
      }, 3000);

      return () => clearTimeout(redirectTimeout); // Clear the timeout on component unmount
    }
  }, [loading, user, navigate]);

  const toggleLogin = () => {
    setShowCreateForm(!showCreateForm);
  }

  return (
    loading ? (
      <p>Loading Sick Beats...</p>
    ) : (
      user ? (
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
        <div className="main-container landing-page-container">
          <h1>Discover the Power of Collaborative Music Creation</h1>
          {!showCreateForm ? (
            <SignIn toggleLoginFunc={toggleLogin} />
          ) : (
            <NewUser toggleLoginFunc={toggleLogin} />
          )}
          <p className="landing-description">
            Welcome to <strong>OtterCollab</strong> — the nexus for rock stars and rising stars alike. Here, creativity knows no bounds, and every connection is a potential masterpiece in the making. With OtterCollab, artists from every corner of the globe come together to compose, share, and produce music in real-time. This platform is a beacon for those who dare to blend sounds, innovate genres, and push the boundaries of music. Embrace the power of collaboration with intuitive tools, a dynamic community, and an immersive experience. Begin your journey with OtterCollab and transform the way you create music. <strong>Join and unlock the power of global collaboration today!</strong>
          </p>
          {/* <p className="landing-description">
                Welcome to <strong>OtterCollab</strong>—where music makers meet to create, share, and inspire. Dive into a world of collaboration and let your sounds travel across the globe. Connect with fellow artists, mix new tracks, and unleash your musical potential. Your next sonic adventure begins here. <strong>Join the symphony of collaboration today!</strong>
              </p> */}
          {/* <p>
            OtterCollab is a cutting-edge platform designed for musicians seeking a collaborative and immersive music creation experience. Uniting artists worldwide, OtterCollab fosters a unique space where creativity thrives through real-time collaboration, allowing users to seamlessly connect, compose, and produce music together. With its intuitive interface, diverse collaboration tools, and a vibrant community, OtterCollab stands out as the go-to destination for musicians aspiring to transcend geographical boundaries and elevate their collaborative music-making journey. Join OtterCollab and unlock the power of global collaboration in music creation like never before
          </p> */}
        </div>
      )
    )
  );
};

export default LandingPage;