import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import axios from 'axios';
import { url } from '../../src/app/firebase/firebase_config'; // Adjust this import path based on your project structure
import 'leaflet/dist/leaflet.css';

// Import dynamically with no SSR
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then((mod) => mod.ImageOverlay), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

const L = typeof window !== 'undefined' ? require('leaflet') : null;

// Create icon with the specified color
const createIcon = (color) => {
  return L ? new L.DivIcon({
    className: 'color-circle-icon',
    html: `<div class="color-circle" style="background-color: ${color};"></div>`,
    iconSize: [20, 20],
  }) : null;
};

const MapLabeling = ({ eventDocID, imgURL }) => {
  const [markers, setMarkers] = useState([]);
  const [bounds, setBounds] = useState([]);
  const [error, setError] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fetchMapMarkers = async () => {
        try {
          if (!eventDocID) {
            throw new Error('Event document ID not found');
          }
          const response = await axios.get(`${url}/markers/marker?eventID=${eventDocID}`);
          console.log('API Response:', response.data);
          setMarkers(response.data.markers);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchMapMarkers();
    }
  }, [eventDocID]);

  useEffect(() => {
    if (imgURL && typeof window !== 'undefined') {
      const img = new Image();
      img.src = imgURL;
      img.onload = () => {
        const imageWidth = img.width;
        const imageHeight = img.height;

        const swLat = 51.49;
        const swLng = -0.08;
        const neLat = swLat + (imageHeight / 10000);
        const neLng = swLng + (imageWidth / 10000);

        setBounds([[swLat, swLng], [neLat, neLng]]);
      };
    }
  }, [imgURL]);

  const handleChange = (index, field, value) => {
    const updatedMarkers = [...markers];
    updatedMarkers[index] = { ...updatedMarkers[index], [field]: value };
    setMarkers(updatedMarkers);
  };

  const updateMarkers = async () => {
    try {
      if (!eventDocID) {
        throw new Error('Event document ID not found');
      }
      const response = await axios.post(`${url}/markers/wait?eventID=${eventDocID}`, {
        markers,
      });
      console.log('Markers successfully updated:', response.data);
      alert('Markers successfully updated!');
    } catch (error) {
      console.error('Error updating markers:', error);
    }
  };

  const handleAddStaffClick = () => {
    setOpenPopup(true);
  };

  const handleAddStaff = async () => {
    const userDocID = localStorage.getItem('userDocID');
    if (!userDocID) {
      throw new Error('User document ID not found in localStorage');
    }
    try {
      const response = await axios.post(`${url}/admin/assignStaff?adminID=${userDocID}`, {
        staffEmail: email,
        eventID: eventDocID,
      });
      console.log('Staff added:', response.data);
      setEmail('');
      setOpenPopup(false);
      alert('Staff successfully added!');
    } catch (error) {
      console.error('Error adding staff:', error);
      alert('Error adding staff. Please try again.');
    }
  };

  return (
    <div>
      {typeof window !== 'undefined' && (
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
      )}

      {/* List marker names and wait times */}
      <div style={{ marginTop: '20px' }}>
        <h3>Marker Details:</h3>
        <p>Change the waiting time of markers</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {markers.map((marker, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <Box display="flex" alignItems="center" gap="10px">
                <h3>{marker.label} - </h3>
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
                    width: '200px',
                  }}
                  placeholder="Wait Time (minutes)"
                />
                <h3 style={{ fontWeight: "normal" }}>minutes</h3>
              </Box>
            </li>
          ))}
        </ul>
      </div>

      <Box display="flex" alignItems="center" gap="10px">
        <button className="dashboard-button" onClick={handleAddStaffClick}>
          Add Staff
        </button>
        <button onClick={updateMarkers} className="dashboard-button">
          Save
        </button>
      </Box>

      {/* Add Staff Popup */}
      <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
        <DialogTitle>Add Staff</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
          <Button onClick={handleAddStaff}>Continue</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MapLabeling;
