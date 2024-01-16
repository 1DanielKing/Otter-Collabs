import { React, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";


function DisplayProfile({ toggleEditMode }) {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    function getFriendsOnLoad() {
      console.log(user);
      fetch(`http://localhost:8080/api/users/${user.id}/friends`)
        .then(response => response.json())
        .then(friends => {
          setFriends(friends);
        })
        .catch(error => console.error('Error fetching friends:', error));
    }
    if (user && (user.id !== undefined)) {
      getFriendsOnLoad();
    }
  }, [user, user.id]);

  return (
    <div className="display-profile-container">
      <div className="profile-details-section">
        <img src={user.imageURL} alt="Profile" className="profile-picture" />
        <h1 className="profile-username">{user.username}</h1>
        <div className="profile-info">
          <h2>Email:</h2>
          <p>{user.email}</p>
        </div>
        <div className="profile-info">
          <h2>Instrument:</h2>
          <p>{user.instrument}</p>
        </div>
        <div className="profile-info">
          <h2>Experience:</h2>
          <p>{user.experienceLevel}</p>
        </div>
        <div className="profile-info">
          <h2>Genre:</h2>
          <p>{user.genre}</p>
        </div>
      </div>
      <div className="profile-friends-section">
        <h2>Friends:</h2>
        {friends.length > 0 ? (
          <ul>
            {Array.from(friends).map(friend => (
              <li key={friend.id}>{friend.username}</li>
            ))}
          </ul>
        ) : (
          <p>No friends yet.</p>
        )}

      </div>
      <button onClick={toggleEditMode}>Edit Profile</button>
    </div>
  );
}



export default DisplayProfile;
