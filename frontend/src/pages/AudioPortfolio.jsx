import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const AudioPortfolio = () => {
  const { user } = useAuth();
  const [audios, setAudios] = useState([]);

  useEffect(() => {
    if (user) {
      fetchAudios();
    }
  }, [user]);

  const fetchAudios = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/audio/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setAudios(response.data);
    } catch (error) {
      console.error("Error fetching audios:", error);
    }
  };

  return (
    <div className="main-container">
      <h2>Your Audio Uploads</h2>
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
              <td>
                <Link to={`/audio/${audio.id}`}>Play Audio</Link>
              </td>
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
      <Link to="/portfolio/upload">Upload New Audio</Link>
    </div>
  );
};

export default AudioPortfolio;
