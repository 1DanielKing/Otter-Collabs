import React from "react";
import { useAuth } from "../contexts/AuthContext";

function DisplayProfile({ toggleEditMode }) {
  const { user } = useAuth();
  return (
    <div className="display-profile-container">
      <div className="profile-picture-section">
        <img src={data.imageURL} alt="Profile" className="profile-picture" />
      </div>
      <div className="profile-details-section">
        <h1 className="profile-username">{data.username}</h1>
        <div className="profile-info">
          <h2>Email:</h2>
          <p>{data.email}</p>
        </div>
        <div className="profile-info">
          <h2>Instrument:</h2>
          <p>{data.instrument}</p>
        </div>
        <div className="profile-info">
          <h2>Experience:</h2>
          <p>{data.experience}</p>
        </div>
        <div className="profile-info">
          <h2>Genre:</h2>
          <p>{data.genre}</p>
        </div>
      </div>
      <button onClick={toggleEditMode}>Edit Profile</button>
    </div>
  );
}

export default DisplayProfile;
