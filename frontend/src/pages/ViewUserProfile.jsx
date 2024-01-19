import React, { useEffect, useState } from "react";
import { UserView , Portfolio } from "../components/ViewOnlyProfile";
import MusicTagsDisplayViewOnly from "../components/MusicTagsDisplayViewOnly";
import axiosBase from "../contexts/axiosBase";
import { useParams } from "react-router-dom";
import "./ProfilePage.css";

const ViewUserProfile = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    axiosBase.get(`/api/users/search?username=${username}`)
      .then(response => {
        setSelectedUser(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [username]);

  if (!selectedUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="main-container">
      <div className="display-profile-container">
        <UserView selectedUser={selectedUser} />
        <MusicTagsDisplayViewOnly data={selectedUser.musicTags} />
        <Portfolio userId={selectedUser.id} />
      </div>
    </div>
  );
};

export default ViewUserProfile;
