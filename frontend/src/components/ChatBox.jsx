import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from 'stompjs/lib/stomp.min.js'
import { useAuth } from '../contexts/AuthContext';

const ChatBox = () => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/chat');
        const client = Stomp.over(socket);

        let isConnected = false;

        client.connect({
            'Authorization': `Bearer ${user.token}`
        }, frame => {
            isConnected = true;
            setStompClient(client);
            client.subscribe('/topic/messages', message => {
                console.log("received: " + message);
                setMessages(prev => [...prev, JSON.parse(message.body)]);
            });
        });

        return () => {
            if (client && isConnected) {
                client.disconnect();
            }
        };
    }, []);

    const sendMessage = () => {
        if (stompClient && newMessage) {
            const chatMessage = { sender: user.username, text: newMessage };
            stompClient.send("/api/message", {}, JSON.stringify(chatMessage));
            setNewMessage("");
        }
    };

    return (
        <div>
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
        </div>
    );
};

export default ChatBox;
