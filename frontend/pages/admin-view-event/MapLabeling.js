import React, { useState, useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Link from 'next/link';
import { Box } from '@mui/material';

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

  // Fetch markers from API
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
  }, [eventDocID]);

  // Set image bounds
  useEffect(() => {
    if (imgURL) {
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
    }
  }, [imgURL]);

  // Handle marker field changes
  const handleChange = (index, field, value) => {
    const updatedMarkers = [...markers];
    updatedMarkers[index] = { ...updatedMarkers[index], [field]: value };
    setMarkers(updatedMarkers);
  };

  // Update markers on save button click
  const updateMarkers = async () => {
    try {
      if (!eventDocID) {
        throw new Error('Event document ID not found');
      }
      const response = await axios.post(`http://localhost:8001/markers/wait?eventID=${eventDocID}`, {
        markers,
      });
      console.log('Markers successfully updated:', response.data);
    } catch (error) {
      console.error('Error updating markers:', error);
    }
  };

  return (
    <div>
      <MapContainer center={[51.50, -0.07]} zoom={13} style={{ height: "600px", width: "100%" }}>
        {bounds.length > 0 && imgURL && (
          <ImageOverlay
            url={imgURL} // Use the dynamic image URL here
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
      
      {/* List marker names and wait times */}
      <div style={{ marginTop: '20px' }}>
        <h3>Marker Details:</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {markers.map((marker, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <Box display="flex" alignItems="center" gap="20px">
                <h3>Label:</h3>
                <input
                  type="text"
                  value={marker.label || ''}
                  onChange={(e) => handleChange(index, 'label', e.target.value)}
                  style={{
                    fontSize: '16px',
                    marginLeft: '10px',
                    padding: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    width: '200px'
                  }}
                  placeholder="Marker Name"
                />
              </Box>
              <br />
              <Box display="flex" alignItems="center" gap="20px">
                <h3>Wait Time:</h3>
                <input
                  type="text"
                  value={marker.waitTime || ''}
                  onChange={(e) => handleChange(index, 'waitTime', e.target.value)}
                  style={{
                    fontSize: '16px',
                    marginLeft: '10px',
                    padding: '5px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    width: '200px'
                  }}
                  placeholder="Wait Time (minutes)"
                />
              </Box>
            </li>
          ))}
        </ul>
      </div>
      
      <br />
      <div className='buttons-container'>
        <button onClick={() => { updateMarkers() }} className='dashboard-button'>
          Save
        </button>
      </div>
    </div>
  );
};

export default MapLabeling;