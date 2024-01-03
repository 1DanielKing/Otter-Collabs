import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProfileCreation = (props) => {
  const { userEmail, userPassword } = props;
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userInstruments, setUserInstruments] = useState("");
  const [userGenre, setUserGenre] = useState("");
  const [userExperience, setUserExperience] = useState("");
  const [userPicture, setUserPicture] = useState("");

  const createProfile = async (event) => {
    event.preventDefault();
    const newUser = {
      userEmail,
      userPassword,
      userName,
      userInstruments,
      userGenre,
      userExperience,
      userPicture,
    };
    try {
      // Send a POST request to the backend endpoint
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        // User creation successful
        console.log("User created successfully");
        navigate("/profile");
        setUserName("");
        setUserInstruments("");
        setUserGenre("");
        setUserExperience("");
        setUserPicture("");
      } else {
        // User creation failed
        console.error("Failed to create user");
        // Handle error or show error message
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleInstrumentChange = (event) => {
    setUserInstruments(event.target.value);
  };
  const handleGenreChange = (event) => {
    setUserGenre(event.target.value);
  };
  const handleExperienceChange = (event) => {
    setUserExperience(event.target.value);
  };
  const handlePictureChange = (event) => {
    setUserPicture(event.target.value);
  };

  return (
    <div>
      <h1>User Information</h1>
      <form onSubmit={createProfile}>
        <div className="profile-box">
          <label htmlFor="userNameInput">Username: </label>
          <input
            id="userNameInput"
            type="text"
            value={userName}
            onChange={handleNameChange}
            placeholder="username"
          />
        </div>
        <div className="profile-box">
          <label htmlFor="instrumentInput">Instruments: </label>
          <input
            id="InstrumentInput"
            type="text"
            value={userInstruments}
            onChange={handleInstrumentChange}
            placeholder="Instruments"
          />
        </div>
        <div className="profile-box">
          <label htmlFor="genreInput">Genres: </label>
          <input
            id="genreInput"
            type="text"
            value={userGenre}
            onChange={handleGenreChange}
            placeholder="Rock, Classical, ect."
          />
        </div>
        <div className="profile-box">
          <label htmlFor="experienceLevel">Experience Level: </label>
          <input
            id="emailInput"
            type="text"
            value={userExperience}
            onChange={handleExperienceChange}
            placeholder="1-5"
          />
        </div>
        <div className="profile-box">
          <label htmlFor="imageUrl">Profile Picture: </label>
          <input
            id="imageUrl"
            type="text"
            value={userPicture}
            onChange={handlePictureChange}
            placeholder="ImageUrl"
          />
        </div>
        <div>
          <button type="submit" className="action-button">
            Finish Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileCreation;
