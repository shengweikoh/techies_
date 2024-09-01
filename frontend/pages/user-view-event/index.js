import ResponsiveAppBar from "../../components/user-navbar/navbar";
import React, { useState, useEffect } from 'react';
import './page.css';
import Link from "next/link";
import EventIcon from '@mui/icons-material/Event';
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box } from "@mui/material";
import { useRouter } from 'next/router';
import axios from "axios";
import dynamic from 'next/dynamic';

const MapLabeling = dynamic(() => import('./MapLabeling'), { ssr: false });

export default function Page() {
  const [mapURL, setMapURL] = useState("");
  const [eventDetails, setEventDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isMapURLLoaded, setIsMapURLLoaded] = useState(false);

  const router = useRouter();
  const { eventDocID } = router.query;
  console.log("EVENT ID ", eventDocID);

  const fetchMapURL = async () => {
    try {
      if (!eventDocID) {
        throw new Error('Event document ID not found in localStorage');
      }
      const response = await axios.get(`http://localhost:8001/map?id=${eventDocID}`);
      console.log('API Response:', response.data.eventMapURL);
      setMapURL(response.data.eventMapURL);
      setIsMapURLLoaded(true); // Set the flag to true when map URL is successfully fetched
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchEventDetails = async () => {
    try {
      if (!eventDocID) {
        throw new Error('Event document ID not found in localStorage');
      }
      const response = await axios.get(`http://localhost:8001/event/detail?eventID=${eventDocID}`);
      setEventDetails(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(`Error fetching eventID ${eventDocID}:`, err);
      return null;
    }
  };

  useEffect(() => {
    fetchMapURL();
    fetchEventDetails();
  }, []);

  const Dashboard = () => {
    if (!eventDetails) {
      return <div>Loading event details...</div>;
    }
    const startDateTime = new Date(eventDetails.startDateTime);
    const endDateTime = new Date(eventDetails.endDateTime);

    const formattedStartDate = startDateTime.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedEndDate = endDateTime.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedStartTime = startDateTime.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const formattedEndTime = endDateTime.toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return (
      <div className="dashboard">
        <div className="dashboard-container">
          <Box display="flex" alignItems="center" gap="15px">
            <MapIcon fontSize="large" />
            <h2>Event Map</h2>
          </Box>
          {isMapURLLoaded && (
            <MapLabeling eventDocID={eventDocID} imgURL={mapURL} />
          )}
          <br />
          <br />
          <Box display="flex" alignItems="center" gap="15px">
            <EventIcon fontSize="large" />
            <h2>Event Details</h2>
          </Box>

          <h2>{eventDetails.eventName}</h2>
          <Box display="flex" alignItems="center" gap="10px">
            <CalendarMonthIcon />
            <p>{formattedStartDate} - {formattedEndDate}</p>
          </Box>
          <Box display="flex" alignItems="center" gap="10px">
            <AccessTimeIcon />
            <p>{formattedStartTime} - {formattedEndTime}</p>
          </Box>
          <Box display="flex" alignItems="center" gap="10px">
            <LocationOnIcon />
            <p>{eventDetails.eventLocation}</p>
          </Box>
          <Box display="flex" alignItems="center" gap="10px">
            <AttachMoneyIcon />
            <p>{eventDetails.eventPrice}</p>
          </Box>

          <br />
          <div className='buttons-container'>
            <Link href="/user-home" className='dashboard-button'>
              Go Back
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main>
      <ResponsiveAppBar />
      <Dashboard />
    </main>
  );
}