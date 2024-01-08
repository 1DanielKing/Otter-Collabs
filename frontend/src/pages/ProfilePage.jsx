import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import DisplayProfile from "../components/DisplayProfile";
import EditProfileForm from "../components/EditProfileForm";

const ProfilePage = () => {
  const { user, login, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="main-container">
      <div className="item-box">
        {editMode ? (
          <EditProfileForm user={user} toggleEditMode={toggleEditMode} />
        ) : (
          <DisplayProfile data={user} toggleEditMode={toggleEditMode} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

