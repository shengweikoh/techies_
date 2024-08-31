import React, { useState, useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Link from 'next/link';

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
            url={imgURL} // Use the dynamic image URL here
            bounds={bounds}
          />
        )}
        {markers.map((marker, index) => {
          // Check if marker.position is valid
          if (marker.position && marker.position.lat !== undefined && marker.position.lng !== undefined) {
            return (
              <Marker 
                key={index} 
                position={marker.position} 
                icon={createIcon(marker.color)}
              >
                <Popup>{marker.label}</Popup>
              </Marker>
            );
          } else {
            console.error('Invalid marker position:', marker.position);
            return null; // Skip rendering if the position is invalid
          }
        })}
      </MapContainer> 
      
      {/* List marker names and wait times */}
      <div style={{ marginTop: '20px' }}>
        <h3>Marker Details:</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {markers.map((marker, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <div>
                <strong>Name:</strong> {marker.label}
              </div>
              <div>
                <strong>Wait Time:</strong> {marker.waitTime} minutes
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <br />
    </div>
  );
};

export default MapLabeling;