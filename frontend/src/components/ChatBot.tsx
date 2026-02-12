import React, { useState } from 'react';

const ChatBot = () => {
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        // Placeholder logic
        setMessages([...messages, { role: 'user', content: input }]);
        setInput('');
    };

    return (
        <div className="chatbot">
            <div className="messages">
                {messages.map((msg, i) => (
                    <div key={i} className={`message ${msg.role}`}>{msg.content}</div>
                ))}
            </div>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatBot;
