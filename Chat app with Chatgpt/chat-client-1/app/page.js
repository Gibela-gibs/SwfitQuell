'use client'
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:3000');

    socketRef.current.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current) {
      socketRef.current.emit('message', input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Chat Client 1</h1>
      <div className="w-full max-w-md bg-gray-100 p-4 rounded shadow-md mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 bg-white rounded mb-2 shadow-sm">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
