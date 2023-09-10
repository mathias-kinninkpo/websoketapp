import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8001'); // Assurez-vous d'ajuster l'URL du serveur

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');

  const handleSend = () => {
    if (message && author) {
      socket.emit('message', { author, content: message });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages([...messages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, [messages]);

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.author}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Your Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chat;
