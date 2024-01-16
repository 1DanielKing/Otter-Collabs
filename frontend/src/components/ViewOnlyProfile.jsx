import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const fetchData = async (url, processData, setData) => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const result = await response.json();
      setData(processData(result));
    } else {
      setData(null);
      console.error("Failed to load data");
    }
  } catch (error) {
    setData(null);
    console.error("Error fetching data:", error);
  }
};

export const UserView = ({ data }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const url = `http://localhost:8080/api/users/search?username=${data}`;
    fetchData(url, (result) => result, setUserData);
  }, [data]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  console.log(userData.instrument);

  return (
    <div>
      <div className="display-profile-container">
        <div className="profile-details-section">
          <h1 className="profile-username">{data}</h1>
          <div className="profile-info">
            <h2>Instrument:</h2>
            <p>{userData.instrument}</p>
          </div>
          <div className="profile-info">
            <h2>Experience:</h2>
            <p>{userData.experienceLevel}</p>
          </div>
          <div className="profile-info">
            <h2>Genre:</h2>
            <p>{userData.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Portfolio = ({ data }) => {
  const [audios, setAudios] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const url = `http://localhost:8080/api/users/search?username=${data}`;
    fetchData(url, (result) => result, setUserData);
  }, [data]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  const fetchAudios = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/audio/user/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      setAudios(response.data);
    } catch (error) {
      console.error("Error fetching audios:", error);
    }
  };

  fetchAudios();
  return (
    <div className="main-container">
      <h2>{data} Uploads</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Genre</th>
            <th>Duration (s)</th>
            <th>Upload Date</th>
          </tr>
        </thead>
        <tbody>
          {audios.map((audio) => (
            <tr key={audio.id}>
              <td>{audio.title}</td>
              <td>{audio.artist}</td>
              <td>{audio.genre}</td>
              <td>{audio.duration}</td>
              <td>
                {audio.uploadDate
                  ? format(new Date(audio.uploadDate), "yyyy-MM-dd")
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
