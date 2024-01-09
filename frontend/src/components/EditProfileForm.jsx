import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const EditProfileForm = ({ user, toggleEditMode }) => {
  const { loadProfileData } = useAuth();
  const [formData, setFormData] = useState({
    imageURL: user.imageURL,
    username: user.username,
    email: user.email,
    instrument: user.instrument,
    experience: user.experience,
    genre: user.genre,
  });
  const defaultProfilePics = [
    '/media/pictures/default-pfp/Otter1.png',
    '/media/pictures/default-pfp/Otter2.png',
    '/media/pictures/default-pfp/Otter3.png',
    '/media/pictures/default-pfp/Otter4.png',
    '/media/pictures/default-pfp/Otter5.png',
    '/media/pictures/default-pfp/Otter6.png',
    '/media/pictures/default-pfp/Otter7.png',
    '/media/pictures/default-pfp/Otter8.png',
    '/media/pictures/default-pfp/Otter9.png',
  ];

  useEffect(() => {
    setFormData({
      imageURL: user.imageURL,
      username: user.username,
      email: user.email,
      instrument: user.instrument,
      experience: user.experience,
      genre: user.genre,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("User information updated successfully");
        loadProfileData();
        toggleEditMode();
      } else {
        console.error("Failed to update user information");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    console.log(user.username);
  };

  const renderProfilePicOptions = () => {
    return defaultProfilePics.map((picUrl, index) => (
      <label key={index} className="profile-pic-option">
        <input
          type="radio"
          name="imageURL"
          value={picUrl}
          checked={formData.imageURL === picUrl}
          onChange={handleChange}
        />
        <img src={picUrl} alt={`Profile ${index + 1}`} style={{ width: '50px', height: '50px' }} />
      </label>
    ));
  };


  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <div className="profile-details-section">
        <div className="profile-info">
          <label htmlFor="userPhoto">Profile Picture URL</label>
          <div className="profile-pics-container">
            {renderProfilePicOptions()}
          </div>
        </div>
        <div className="profile-info">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="profile-info">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="profile-info">
          <label htmlFor="instrument">Instrument</label>
          <input
            type="text"
            id="instrument"
            name="instrument"
            value={formData.instrument}
            onChange={handleChange}
          />
        </div>
        <div className="profile-info">
          <label htmlFor="experience">Experience</label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </div>
        <div className="profile-info">
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit">Save Changes</button>
          <button type="button" onClick={toggleEditMode}>Cancel</button>
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;