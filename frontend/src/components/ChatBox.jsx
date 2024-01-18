/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
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
    const selectedUserRef = useRef();
    const messagesEndRef = useRef(null);
    const { user } = useAuth();

    const toggleChatBox = () => setIsExpanded(!isExpanded);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data, status } = await axiosBase.get('/api/users');
                if (status === 200) {
                    setFriends(data);
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        };

        fetchUsers();
    }, []);

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
                // add message only if that conversation is open
                if (selectedUserRef.current && (incomingMessage.sender === selectedUserRef.current.username)) {
                    setMessages(prev => [...prev, incomingMessage]);
                }
                if (selectedUser) {
                    console.log(selectedUser.username === incomingMessage.sender ? "sender matches selected user" : "sender does not match selected user");
                } else {
                    console.log("selectedUser is null");
                }
            });
        });

        return () => {
            if (client && isConnected) {
                client.disconnect();
            }
        };
    }, []);

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
        function logMessagesOnChange() {
            console.log(messages);
        }
        logMessagesOnChange();
    }, [messages]);

    useEffect(() => {
        function updateSelectedUserRef() {
            selectedUserRef.current = selectedUser;
        }
        updateSelectedUserRef();
    }, [selectedUser]);

    useEffect(() => {
        fetchMessageHistory();
    }, [selectedUser, user.username]);

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setMessages([]);
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
                                    <div key={msg.id}>{msg.sender}: {msg.text}</div>
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
