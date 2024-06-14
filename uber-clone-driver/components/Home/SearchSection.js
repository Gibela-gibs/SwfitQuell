import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function SearchSection() {
  const [rideRequest, setRideRequest] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:5001');

    socketRef.current.on('ride:request', (data) => {
      setRideRequest(data);
    });

    return () => {
      socketRef.current.off('ride:request');
      socketRef.current.disconnect();
    };
  }, []);

  const handleAccept = () => {
    if (rideRequest) {
      socketRef.current.emit('ride:accept', rideRequest);
      setRideRequest(null);
    }
  };

  const handleDecline = () => {
    if (rideRequest) {
      socketRef.current.emit('ride:decline', rideRequest);
      setRideRequest(null);
    }
  };

  return (
    <div>
      {rideRequest && (
        <div className='p-2 md:p-6 border-[2px] rounded-xl'>
          <p className='text-[20px] font-bold'>Ride Request</p>
          <div className='p-2 md:p-6 border-[2px] rounded-lg'>
            <p>Source: {rideRequest.rideRequest.source.label}</p>
            <p>Destination: {rideRequest.rideRequest.destination.label}</p>
          </div>
          
          <button className='p-3 bg-black w-full mt-5 text-white rounded-lg' onClick={handleAccept}>
            Accept
          </button>
          <button className='p-3 bg-black w-full mt-2 text-white rounded-lg' onClick={handleDecline}>
            Decline
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchSection;







