import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const OnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:5001');

    // Handle server confirmation of status change
    const handleStatusChange = (status) => {
      console.log(`Driver is now ${status ? 'online' : 'offline'}`);
    };

    socketRef.current.on('status:change', handleStatusChange);

    return () => {
      socketRef.current.off('status:change', handleStatusChange);
      socketRef.current.disconnect();
    };
  }, []);

  const toggleOnlineStatus = () => {
    setIsOnline((prevStatus) => !prevStatus);
    socketRef.current.emit('status:change', { isOnline: !isOnline });
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-4">Driver Status</h2>
      <button
        className={`p-3 w-full text-white rounded-lg ${
          isOnline ? 'bg-red-500' : 'bg-green-500'
        }`}
        onClick={toggleOnlineStatus}
      >
        {isOnline ? 'Go Offline' : 'Go Online'}
      </button>
    </div>
  );
};

export default OnlineStatus;