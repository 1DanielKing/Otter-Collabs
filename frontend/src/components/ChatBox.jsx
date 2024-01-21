import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from 'stompjs/lib/stomp.min.js'
import { useAuth } from '../contexts/AuthContext';
import axiosBase from '../contexts/axiosBase';

const ChatBox = () => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [friends, setFriends] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const messagesEndRef = useRef(null);
    const { user } = useAuth();

    const toggleChatBox = () => setIsExpanded(!isExpanded);

    useEffect(() => {
        const getFriendsOnLoad = () => {
            if (user && (user.id !== undefined)) {
                axiosBase.get(`/api/users/${user.id}/friends`)
                    .then(response => setFriends(response.data))
                    .catch(error => console.error('Error fetching friends:', error));
            }
        };

        getFriendsOnLoad();
    }, [user]);

    useEffect(() => {
        const socket = new SockJS(`http://localhost:8080/chat`);
        const client = Stomp.over(socket);

        let isConnected = false;
        console.log('Current token: ' + user.token);

        client.connect({
            'Authorization': `Bearer ${user.token}`
        }, frame => {
            isConnected = true;
            setStompClient(client);
            client.subscribe('/user/queue/messages', message => {
                const incomingMessage = JSON.parse(message.body);
                handleIncomingMessage(incomingMessage);
            });
        });

        return () => {
            if (client && isConnected) {
                client.disconnect();
            }
        };
    }, []);

    const handleIncomingMessage = (incomingMessage) => {
        const senderUsername = incomingMessage.sender;
        const senderUser = friends.find(friend => friend.username === senderUsername);
        console.log("sender username: " + senderUsername)

        if (senderUser) {
            if (!isExpanded) {
                console.log("expanding chat.")
                setIsExpanded(true);
            }

            if (!selectedUser || selectedUser.username !== senderUsername) {
                handleUserSelect(senderUser);
            }

            if (selectedUser && senderUsername === selectedUser.username) {
                setMessages(prev => [...prev, incomingMessage]);
            }
        }
    };

    const fetchMessageHistory = async () => {
        if (selectedUser) {
            axiosBase.get(`/api/message/history?user1=${user.username}&user2=${selectedUser.username}`)
                .then(({ data, status }) => {
                    if (status === 200) {
                        setMessages(Array.isArray(data) ? data : []);
                    } else {
                        console.error('Failed to fetch message history');
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch message history', error);
                });
        }
    };

    useEffect(() => {
        fetchMessageHistory();
    }, [selectedUser, user.username]);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);



    const sendMessage = async () => {
        if (stompClient && newMessage && selectedUser) {
            const chatMessage = { sender: user.username, recipient: selectedUser.username, text: newMessage };
            stompClient.send("/api/message", { 'Authorization': `Bearer ${user.token}` }, JSON.stringify(chatMessage));
            setNewMessage("");
            await fetchMessageHistory();
        }
    };

    return (
        <div className={isExpanded ? "chatbox" : "chatbox-collapsed"}>
            {isExpanded ? (
                <>
                    <div className="chatbox-header">
                        <div className="chatbox-header-arrow-space">
                            {selectedUser ? (
                                <div className="chatbox-back-arrow" onClick={() => setSelectedUser(null)}>
                                    &#8592; {/* Left arrow */}
                                </div>
                            ) : (
                                <div className="chatbox-back-arrow">&nbsp;</div>
                            )}
                        </div>
                        <div className="chatbox-title" onClick={toggleChatBox}>Messages</div>
                    </div>
                    {selectedUser ? (
                        <>
                            <div className='chatbox-content'>
                                {messages.map((msg) => (
                                    <div key={msg.id}>
                                        <span style={{ fontWeight: 'bold' }}>{msg.sender}:</span> {msg.text}
                                    </div>
                                ))}
                                {/* Invisible element for auto scroll down */}
                                <div ref={messagesEndRef} />
                            </div>
                            <input
                                className="chatbox-input"
                                type="text"
                                value={newMessage}
                                onChange={e => setNewMessage(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }}
                            />
                            <button onClick={sendMessage}>Send</button>
                        </>
                    ) : (
                        <div className="chatbox-user-selection-container">
                            Select a user to chat with:
                            {friends.map((friend) => (
                                <div key={friend.id} onClick={() => handleUserSelect(friend)} className="chatbox-user-item">
                                    {friend.username}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div onClick={toggleChatBox}>Messages</div> // Collapsed state
            )}
        </div>
    );
}

export default ChatBox;
