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

  return (
    <form onSubmit={handleSubmit}>
      <div className="profile">
        <h1>profile picture</h1>
        <input
          type="text"
          name="userPhoto"
          value={formData.userPhoto}
          onChange={handleChange}
        />
      </div>
      <div className="profile">
        <h1>username</h1>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="profile">
        <h1>email</h1>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="profile">
        <h1>instrument</h1>
        <input
          type="text"
          name="instrument"
          value={formData.instrument}
          onChange={handleChange}
        />
      </div>
      <div className="profile">
        <h1>experience</h1>
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
        />
      </div>
      <div className="profile">
        <h1>genre</h1>
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={toggleEditMode}>
        Cancel
      </button>
    </form>
  );
};

export default EditProfileForm;
