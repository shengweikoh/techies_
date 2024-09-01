import React, { useState, useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Box } from '@mui/material';

// Create icon with the specified color
const createIcon = (color) => {
  return new L.DivIcon({
    className: 'color-circle-icon',
    html: `<div class="color-circle" style="background-color: ${color};"></div>`,
    iconSize: [20, 20],
  });
};

const MapLabeling = ({ eventDocID, imgURL }) => {
  const [markers, setMarkers] = useState([]);
  const [bounds, setBounds] = useState([]);
  const [error, setError] = useState(null);

  const fetchMapMarkers = async () => {
    try {
      if (!eventDocID) {
        throw new Error('Event document ID not found');
      }
      const response = await axios.get(`http://localhost:8001/markers/marker?eventID=${eventDocID}`);
      console.log('API Response:', response.data);
      setMarkers(response.data.markers);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchMapMarkers();
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = imgURL;
    img.onload = () => {
      const imageWidth = img.width;
      const imageHeight = img.height;

      const swLat = 51.49; // South-West Latitude
      const swLng = -0.08; // South-West Longitude
      const neLat = swLat + (imageHeight / 10000); // North-East Latitude
      const neLng = swLng + (imageWidth / 10000);  // North-East Longitude
      
      setBounds([[swLat, swLng], [neLat, neLng]]);
    };
  }, [imgURL]);

  return (
    <div>
      <MapContainer center={[51.50, -0.07]} zoom={13} style={{ height: "600px", width: "100%" }}>
        {bounds.length > 0 && imgURL && (
          <ImageOverlay
            url={imgURL}
            bounds={bounds}
          />
        )}
        {markers.map((marker, index) => {
          if (marker.position && marker.position.lat !== undefined && marker.position.lng !== undefined) {
            return (
              <Marker 
                key={index} 
                position={marker.position} 
                icon={createIcon(marker.color)}
              >
                <Popup>{`${marker.label}, ${marker.waitTime} minutes`}</Popup>
              </Marker>
            );
          } else {
            console.error('Invalid marker position:', marker.position);
            return null;
          }
        })}
      </MapContainer> 
      
      <div style={{ marginTop: '20px' }}>
        <h2>Marker Details:</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {markers.map((marker, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <div>
                <Box display="flex" alignItems="center" gap="10px">
                  <h3>{marker.label} - </h3> 
                  <h3 style={{fontWeight: "normal"}}>{marker.waitTime} minutes</h3>
                </Box>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapLabeling;