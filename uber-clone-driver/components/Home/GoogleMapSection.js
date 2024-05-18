import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, MarkerF, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import io from 'socket.io-client';

function DriverMap() {
  const containerStyle = {
    width: '205%',
    height: '100vh',
  };

  const [center, setCenter] = useState({ lat: 37.7749295, lng: -122.4194155 });
  const [map, setMap] = useState(null);
  const [rideRequest, setRideRequest] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:5001');

    socketRef.current.on('ride:request', (data) => {
      console.log('New ride request:', data);
      setRideRequest(data);
    });

    return () => {
      socketRef.current.off('ride:request');
      socketRef.current.disconnect();
    };
  }, []);

  const handleAcceptRide = () => {
    if (rideRequest) {
      socketRef.current.emit('ride:accept', {
        driverId: 'driver123', // Replace with actual driver ID
        rideRequest,
      });
    }
  };

  const onLoad = React.useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  const updateLocation = (position) => {
    const { latitude, longitude } = position.coords;
    setCenter({ lat: latitude, lng: longitude });
    socketRef.current.emit('location:update', {
      type: 'driver',
      coords: { lat: latitude, lng: longitude },
    });
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(updateLocation, console.error, { enableHighAccuracy: true });
  }, []);

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {rideRequest && (
          <div className='fixed top-5 left-5 bg-white p-5 shadow-xl'>
            <h2>New Ride Request</h2>
            <p>Source: {rideRequest.rideRequest.source.label}</p>
            <p>Destination: {rideRequest.rideRequest.destination.label}</p>
            <button onClick={handleAcceptRide}>Accept Ride</button>
          </div>
        )}

        <MarkerF
          position={center}
          icon={{
            url: 'driver.png',
            scaledSize: { width: 20, height: 20 },
          }}
        />
      </GoogleMap>
    </div>
  );
}

export default DriverMap;
