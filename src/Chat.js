// src/Chat.js
import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = () => {
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userMessage.trim()) return;

        const newMessage = { role: 'user', content: userMessage };
        setChatHistory([...chatHistory, newMessage]);

        try {
            const response = await axios.post('http://127.0.0.1:8000/chat/', {
                user_message: userMessage,
            });
            const botMessage = { role: 'assistant', content: response.data.response };
            setChatHistory([...chatHistory, newMessage, botMessage]);
            setUserMessage('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="chat-container">
            <h1>Chat with AI</h1>
            <div className="chat-box">
                {chatHistory.map((message, index) => (
                    <div key={index} className={`message ${message.role}`}>
                        <strong>{message.role}:</strong> {message.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Type your message here"
                    className="chat-input"
                />
                <button type="submit" className="chat-button">Send</button>
            </form>
        </div>
    );
};

export default Chat;
