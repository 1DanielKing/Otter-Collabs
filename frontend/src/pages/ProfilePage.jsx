import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import DisplayProfile from "../components/DisplayProfile";
import { SpotifyAuth, HandleCallback } from "../contexts/SpotifyAuth";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import { client_Secret, client_Id, redirect_Uri } from "../contexts/SpotifyId";
import EditProfileForm from "../components/EditProfileForm";

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    if (location.pathname.includes("/") && location.search.includes("?code=")) {
      HandleCallback(location, navigate);
    }
  }, [location]);

  if (!user) {
    console.log(user);
    return <div>Loading profile...</div>;
  }

  return (
    <div className="main-container display-profile-container">
      <div className="item-box">
        {editMode ? (
          <EditProfileForm user={user} toggleEditMode={toggleEditMode} />
        ) : (
          <>
            <DisplayProfile data={user} toggleEditMode={toggleEditMode} />
            {location.pathname.includes("/") &&
            location.search.includes("?code=") ? null : (
              <SpotifyAuth />
            )}{" "}
            {/* Add condition to render SpotifyAuth */}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
