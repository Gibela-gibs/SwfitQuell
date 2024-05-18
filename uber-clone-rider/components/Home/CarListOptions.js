import React, { useState, useEffect, useContext, useRef } from 'react';
import { CarListData } from '../../utils/CarListData';
import CarListItem from './CarListItem';
import io from 'socket.io-client';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';

const CarListOptions = ({ distance }) => {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:5001');
    socketRef.current.on('ride:accepted', (data) => {
      console.log('Ride request accepted by driver:', data);
      // Handle UI update or navigation to booking page, etc.
    });

    return () => {
      socketRef.current.off('ride:accepted');
      socketRef.current.disconnect();
    };
  }, []);

  const handleRequest = () => {
    if (selectedCar) {
      console.log('Source:', source);
      console.log('Destination:', destination);
      socketRef.current.emit('ride:request', {
        selectedCar,
        rideRequest: {
          source: source,
          destination: destination,
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
          className={`cursor-pointer p-2 px-4 rounded-md border-black ${
            activeIndex === index ? 'border-[3px]' : null
          }`}
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
    </div>
  );
};

export default CarListOptions;
