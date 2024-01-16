import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Import the AuthContext
const FriendsPage = () => {
    const [friends, setFriends] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const { user } = useAuth(); // Get the current user from AuthContext

    useEffect(() => {
        async function getFriendsOnLoad() {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/${user.id}/friends`);
                setFriends(response.data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        }
        async function getRequestsOnLoad() {
            //TODO logic fetching friend requests from api server
        }
        if (user && (user.id !== undefined)) {
            getFriendsOnLoad();
            getRequestsOnLoad();
        }
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
                <ul>
                    {friends.map((friend) => (
                        <li key={friend.id}>{friend.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No friends yet.</p>
            )}
        </div>
    );
};

export default FriendsPage;
