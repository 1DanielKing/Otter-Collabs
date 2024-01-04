import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from 'stompjs/lib/stomp.min.js'

const ChatBox = () => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/chat');
        const client = Stomp.over(socket);

        let isConnected = false;

        client.connect({}, frame => {
            isConnected = true;
            setStompClient(client);
            client.subscribe('/topic/messages', message => {
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
            const chatMessage = { sender: "User", text: newMessage };
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setNewMessage("");
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg) => (
                    <div key={msg.id}>{msg.from}: {msg.text}</div>
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