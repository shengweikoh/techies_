import React, { useState, useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Link from 'next/link';

const MapClickHandler = ({ setMarkers, markers, color, setSelectedMarker }) => {
  useMapEvents({
    click(e) {
      const label = prompt("Enter label text:");
      if (label) {
        setMarkers([...markers, { position: e.latlng, label, color }]);
        setSelectedMarker(null); // Deselect any previously selected marker
      }
    }
  });
  return null;
};

const createIcon = (color) => {
  return new L.DivIcon({
    className: 'color-circle-icon',
    html: `<div class="color-circle" style="background-color: ${color};"></div>`,
    iconSize: [20, 20],
  });
};

const MapLabeling = () => {
  const [markers, setMarkers] = useState([]);
  const [bounds, setBounds] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#1E90FF'); // Default color: Blue
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/assets/sketch1.jpg'; // Ensure this path is correct
    img.onload = () => {
      const imageWidth = img.width;
      const imageHeight = img.height;

      // Define the latitude and longitude bounds based on your image size
      // Adjust these values to fit your specific image
      const swLat = 51.49; // South-West Latitude
      const swLng = -0.08; // South-West Longitude
      const neLat = swLat + (imageHeight / 10000); // North-East Latitude
      const neLng = swLng + (imageWidth / 10000);  // North-East Longitude
      
      setBounds([[swLat, swLng], [neLat, neLng]]);
    };
  }, []);

  const handleMarkerClick = (index) => {
    setSelectedMarker(index);
  };

  const handleDeleteMarker = (e) => {
    e.stopPropagation(); // Prevent the delete button click from triggering marker click
    if (selectedMarker !== null) {
      setMarkers(markers.filter((_, index) => index !== selectedMarker));
      setSelectedMarker(null);
    }
  };

  const exportMarkersToDatabase = async () => {
    console.log(markers);
    try {
      const response = await axios.post('http://localhost:8001/markers', {
        markers,
      });
      console.log('Markers successfully sent to the server:', response.data);
    } catch (error) {
      console.error('Error sending markers to the server:', error);
    }
  };

  return (
    <div>
      <div className="color-selector">
        <br />
        <button onClick={() => setSelectedColor('#1E90FF')} style={{ backgroundColor: '#1E90FF' }}></button>
        <button onClick={() => setSelectedColor('#FF0000')} style={{ backgroundColor: '#FF0000' }}></button>
        <button onClick={() => setSelectedColor('#008000')} style={{ backgroundColor: '#008000' }}></button>
        <button onClick={() => setSelectedColor('#FFFF00')} style={{ backgroundColor: '#FFFF00' }}></button>
      </div>

      <div>
        Colour Selected:
        <br />
        <div className="color-preview" style={{ backgroundColor: selectedColor }}></div>
      </div>

      <MapContainer center={[51.50, -0.07]} zoom={14} style={{ height: "600px", width: "100%" }}>
        {bounds.length > 0 && (
          <ImageOverlay
            url="/assets/sketch1.jpg"
            bounds={bounds}
          />
        )}
        <MapClickHandler 
          setMarkers={setMarkers} 
          markers={markers} 
          color={selectedColor} 
          setSelectedMarker={setSelectedMarker}
        />
        {markers.map((marker, index) => (
          <Marker 
            key={index} 
            position={marker.position} 
            icon={createIcon(marker.color)}
            eventHandlers={{
              click: () => handleMarkerClick(index)
            }}
          >
            <Popup>
              {marker.label}
              <br />
              <button onClick={handleDeleteMarker} style={{ marginTop: '5px' }}>Delete</button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <br />
      
      <div className='buttons-container'>
        <Link href="/admin-home" onClick={exportMarkersToDatabase} className='dashboard-button'>
          Create Event
        </Link>
      </div>
    </div>
  );
};

export default MapLabeling;