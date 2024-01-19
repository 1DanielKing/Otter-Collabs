import React, { useEffect, useState } from 'react';
import axiosBase from '../contexts/axiosBase';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const FriendsPage = () => {
    const [friends, setFriends] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const { user } = useAuth(); // Get the current user from AuthContext

    useEffect(() => {
        const getFriendsOnLoad = () => {
            if (user && (user.id !== undefined)) {
                axiosBase.get(`/api/users/${user.id}/friends`)
                    .then(response => setFriends(response.data))
                    .catch(error => console.error('Error fetching friends:', error));
            }
        };

        const getRequestsOnLoad = () => {
            // TODO: Logic fetching friend requests from api server
        };

        getFriendsOnLoad();
        getRequestsOnLoad();
    }, [user, user.id]);


    return (
        <div className="main-container">
            <h1>Friends</h1>
            <h2>Pending Friend Requests</h2>
            <ul>
                {pendingRequests.map((request) => (
                    <li key={request.id}>{request.name}</li>
                ))}
            </ul>
            <h2>My Friends</h2>
            {friends.length > 0 ? (
                <div className="friend-list-container">
                    <ul>
                        {friends.map((friend) => (
                            <li key={friend.id}>
                                <img src={friend.imageURL} alt='otter wearing headphones' className="friends-profile-picture" />
                                <Link to={`/user/${friend.username}`}>{friend.username}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No friends yet.</p>
            )}
        </div>
    );
};

export default FriendsPage;
