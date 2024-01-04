import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const ProfileCreation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // Changed from userName
  const [instrument, setInstrument] = useState(""); // Changed from userInstruments
  const [genre, setGenre] = useState(""); // Changed from userGenre
  const [experienceLevel, setExperienceLevel] = useState(""); // Changed from userExperience
  const [imageURL, setImageURL] = useState("");
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      console.log('User logged in:', user);
      navigate("/test");
    }
  }, [user, navigate]);

  const createProfile = async (event) => {
    event.preventDefault();
    const { userEmail, userPassword } = location.state;
    const newUser = {
      username,
      password: userPassword,
      email: userEmail,
      instrument,
      genre,
      experienceLevel: parseInt(experienceLevel) || 0,
      imageURL,
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
        console.log("User created successfully, attempting to login...");
        await login(username, userPassword).then(() => {
          console.log('Current user after login attempt:', user);
          navigate("/test");
        });
        setUsername("");
        setInstrument("");
        setGenre("");
        setExperienceLevel("");
        setImageURL("");
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
    setUsername(event.target.value);
  };
  const handleInstrumentChange = (event) => {
    setInstrument(event.target.value);
  };
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };
  const handleExperienceChange = (event) => {
    setExperienceLevel(event.target.value);
  };
  const handlePictureChange = (event) => {
    setImageURL(event.target.value);
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
            value={username}
            onChange={handleNameChange}
            placeholder="username"
          />
        </div>
        <div className="profile-box">
          <label htmlFor="instrumentInput">Instruments: </label>
          <input
            id="InstrumentInput"
            type="text"
            value={instrument}
            onChange={handleInstrumentChange}
            placeholder="Instruments"
          />
        </div>
        <div className="profile-box">
          <label htmlFor="genreInput">Genres: </label>
          <input
            id="genreInput"
            type="text"
            value={genre}
            onChange={handleGenreChange}
            placeholder="Rock, Classical, ect."
          />
        </div>
        <div className="profile-box">
          <label htmlFor="experienceLevel">Experience Level: </label>
          <input
            id="emailInput"
            type="text"
            value={experienceLevel}
            onChange={handleExperienceChange}
            placeholder="1-5"
          />
        </div>
        <div className="profile-box">
          <label htmlFor="imageUrl">Profile Picture: </label>
          <input
            id="imageUrl"
            type="text"
            value={imageURL}
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
