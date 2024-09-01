import React, { useState, useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Snackbar, Alert } from '@mui/material';

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
  const [openPopup, setOpenPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
      setSnackbarOpen(true); // Show the snackbar when markers are updated
    } catch (error) {
      console.error('Error updating markers:', error);
    }
  };

  // Handle Add Staff button click
  const handleAddStaffClick = () => {
    setOpenPopup(true);
  };

  // Handle API call to add staff
  const handleAddStaff = async () => {
    const userDocID = localStorage.getItem('userDocID');
    if (!userDocID) {
        throw new Error('User document ID not found in localStorage');
    }
    try {
      const response = await axios.post(`http://localhost:8001/admin/assignStaff?adminID=${userDocID}`, {
        staffEmail: email,
        eventID: eventDocID
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

      {/* List marker names and wait times */}
      <div style={{ marginTop: '20px' }}>
        <h3>Marker Details:</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {markers.map((marker, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <Box display="flex" alignItems="center" gap="10px">
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
              <Box display="flex" alignItems="center" gap="10px">
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
                <h3 style={{ fontWeight: "normal" }}>minutes</h3>
              </Box>
            </li>
          ))}
        </ul>
      </div>

      <br />
      <Box display="flex" alignItems="center" gap="10px">
        <button className='dashboard-button' onClick={handleAddStaffClick}>
          Add Staff
        </button>
        <button onClick={updateMarkers} className='dashboard-button'>
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

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Updated Marker Details
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MapLabeling;