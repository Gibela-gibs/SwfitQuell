import React, { useEffect, useContext, useState, useRef } from 'react';
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';
import io from 'socket.io-client';

function GoogleMapSection() {
  const containerStyle = {
    width: '205%',
    height: '100vh',
  };

  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [center, setCenter] = useState({ lat: 37.7749295, lng: -122.4194155 });
  const [map, setMap] = useState(null);
  const [directionRoutePoints, setDirectionRoutePoints] = useState([]);
  const [driverLocation, setDriverLocation] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    socketRef.current = io('http://localhost:5001');

    // Listen for location updates
    socketRef.current.on('location:update', (location) => {
      if (location.type === 'driver') {
        setDriverLocation(location.coords);
      }
    });

    // Clean up function to disconnect Socket.IO
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (source && map) {
      map.panTo({ lat: source.lat, lng: source.lng });
      setCenter({ lat: source.lat, lng: source.lng });
      if (source && destination) directionRoute();
    }
  }, [source, map]);

  useEffect(() => {
    if (destination && map) {
      setCenter({ lat: destination.lat, lng: destination.lng });
      if (source && destination) directionRoute();
    }
  }, [destination, map]);

  const directionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirectionRoutePoints(result);
        } else {
          console.error('Error');
        }
      }
    );
  };

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={8}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: 'c0f82c33615b1955' }}
    >
      {source && (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{ url: 'source.png', scaledSize: { width: 20, height: 20 } }}
        >
          <OverlayView position={{ lat: source.lat, lng: source.lng }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div className='p-2 bg-white font-bold inline-block'>
              <p className='text-black text-[16px]'>{source.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      )}
      {destination && (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{ url: 'dest.jpg', scaledSize: { width: 20, height: 20 } }}
        >
          <OverlayView position={{ lat: destination.lat, lng: destination.lng }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div className='p-2 bg-white font-bold inline-block'>
              <p className='text-black text-[16px]'>{destination.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      )}
      {driverLocation && (
        <MarkerF
          position={{ lat: driverLocation.lat, lng: driverLocation.lng }}
          icon={{ url: 'driver.png', scaledSize: { width: 20, height: 20 } }}
        />
      )}
      <DirectionsRenderer
        directions={directionRoutePoints}
        options={{
          polylineOptions: {
            strokeColor: '000',
            strokeWeight: 5,
          },
          suppressMarkers: true,
        }}
      />
    </GoogleMap>
  );
}

export default GoogleMapSection;
