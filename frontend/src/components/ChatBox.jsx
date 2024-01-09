import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from 'stompjs/lib/stomp.min.js'
import { useAuth } from '../contexts/AuthContext';

const ChatBox = () => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [friends, setFriends] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const { user } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            // API call to fetch all users, will replace with friends specifically once friending is established
            const response = await fetch('http://localhost:8080/api/users');
            if (response.ok) {
                const data = await response.json();
                setFriends(data);
            } else {
                console.error('Failed to fetch users');
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/chat');
        const client = Stomp.over(socket);

        let isConnected = false;

        client.connect({
            'Authorization': `Bearer ${user.token}`
        }, frame => {
            isConnected = true;
            setStompClient(client);
            client.subscribe('/user/queue/messages', message => {
                setMessages(prev => [...prev, JSON.parse(message.body)]);
            });
        });

        return () => {
            if (client && isConnected) {
                client.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (selectedUser) {
            const fetchMessageHistory = async () => {
                const response = await fetch(`http://localhost:8080/api/message/history?user1=${user.username}&user2=${selectedUser.username}`);
                if (response.ok) {
                    const data = await response.json();
                    setMessages(Array.isArray(data) ? data : []);
                } else {
                    console.error('Failed to fetch message history');
                }
            };

            fetchMessageHistory();
        }
    }, [selectedUser, user.username]);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setMessages([]); // Clear previous messages
    };



    const sendMessage = () => {
        if (stompClient && newMessage && selectedUser) {
            const chatMessage = { sender: user.username, recipient: selectedUser.username, text: newMessage };
            stompClient.send("/api/message", {}, JSON.stringify(chatMessage));
            setNewMessage("");
            setMessages(prev => [...prev, chatMessage]); // Optionally add to local state
        }
    };

    return (
        <div className="chatbox">
            <div>
                {selectedUser ? (
                    <>
                        <div>
                            {messages.map((msg) => (
                                <div key={msg.id}>{msg.sender}: {msg.text}</div>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </>
                ) : (
                    <div>
                        Select a user to chat with
                        <div>
                            {friends.map((friend) => (
                                <div key={friend.id} onClick={() => handleUserSelect(friend)}>
                                    {friend.username}
                                </div>
                            ))}
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
};

export default ChatBox;
