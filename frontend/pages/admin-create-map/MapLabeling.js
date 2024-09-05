import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Link from 'next/link';

// Dynamically import Leaflet components with no SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const ImageOverlay = dynamic(() => import('react-leaflet').then(mod => mod.ImageOverlay), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

import 'leaflet/dist/leaflet.css';

const L = typeof window !== 'undefined' ? require('leaflet') : null;

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
  const [selectedColor, setSelectedColor] = useState('#1E90FF');
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
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

  const handleMarkerClick = (index) => {
    setSelectedMarker(index);
  };

  const handleDeleteMarker = (e) => {
    e.stopPropagation();
    if (selectedMarker !== null) {
      setMarkers(markers.filter((_, index) => index !== selectedMarker));
      setSelectedMarker(null);
    }
  };

  const exportMarkersToDatabase = async () => {
    try {
      const response = await axios.post(`http://localhost:8001/markers?eventID=${eventDocID}`, {
        markers,
      });
      console.log('Markers successfully sent to the server:', response.data);
    } catch (error) {
      console.error('Error sending markers to the server:', error);
    }
  };

  return (
    <div>
      {typeof window !== 'undefined' && (
        <>
          <p>Select a colour from below, then click on your desired point on the map to add a marker!</p>
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

          <MapContainer center={[51.50, -0.07]} zoom={13} style={{ height: "600px", width: "100%" }}>
            {bounds.length > 0 && imgURL && (
              <ImageOverlay
                url={imgURL}
                bounds={bounds}
              />
            )}
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
        </>
      )}
    </div>
  );
};

export default MapLabeling;
