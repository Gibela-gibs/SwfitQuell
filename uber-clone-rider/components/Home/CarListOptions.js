import React, { useState, useEffect, useContext, useRef } from 'react';
import { CarListData } from '../../utils/CarListData';
import CarListItem from './CarListItem';
import io from 'socket.io-client';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

const CarListOptions = ({ distance }) => {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // Add state for message type
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:5001');

    const handleRideAccepted = (data) => {
      setMessage(`Your ride request for ${data.selectedCar.name} has been accepted by the driver.`);
      setMessageType('accepted');
      setTimeout(() => setMessage(''), 5000); // Clear the message after 5 seconds
    };

    const handleRideDeclined = (data) => {
      setMessage(`Your ride request for ${data.selectedCar.name} has been declined by the driver.`);
      setMessageType('declined');
      setTimeout(() => setMessage(''), 5000); // Clear the message after 5 seconds
    };

    socketRef.current.on('ride:accepted', handleRideAccepted);
    socketRef.current.on('ride:declined', handleRideDeclined);

    return () => {
      socketRef.current.off('ride:accepted', handleRideAccepted);
      socketRef.current.off('ride:declined', handleRideDeclined);
      socketRef.current.disconnect();
    };
  }, []);

  const handleRequest = () => {
    if (selectedCar) {
      socketRef.current.emit('ride:request', {
        selectedCar,
        rideRequest: {
          source,
          destination,
        },
      });
    }
  };

  return (
    <div className='mt-5 p-5 overflow-auto h-[300px]'>
      <h2 className='text-[22px] font-bold'>Recommended</h2>
      {CarListData.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer p-2 px-4 rounded-md border-black ${activeIndex === index ? 'border-[3px]' : null}`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedCar(item);
          }}
        >
          <CarListItem car={item} distance={distance} />
        </div>
      ))}

      {selectedCar?.name && (
        <div className='flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center rounded-lg'>
          <h2>Make Payment For</h2>
          <button className='p-3 bg-black text-white rounded-lg text-center' onClick={handleRequest}>
            Request {selectedCar.name}
          </button>
        </div>
      )}

      {message && (
        <div
          className={`fixed bottom-5 p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center rounded-lg ${
            messageType === 'accepted' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default CarListOptions;
