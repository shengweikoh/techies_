import ResponsiveAppBar from "../../components/user-navbar/navbar";
import React from 'react';
import './page.css';
import Link from "next/link";
import EventIcon from '@mui/icons-material/Event';
import CreateIcon from '@mui/icons-material/Create';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box } from "@mui/material";
import { useState, useEffect } from 'react';
import axios from "axios";

export default function Page() {
    const Dashboard = () => {
        const [adminEvents, setAdminEvents] = useState(null);
        const [eventsArray, setEventsArray] = useState([]);
        const [error, setError] = useState(null);

        const fetchEventsData = async () => {
            try {
                const userDocID = localStorage.getItem('userDocID');
                if (!userDocID) {
                    throw new Error('User document ID not found in localStorage');
                }
                const response = await axios.get(`http://localhost:8001/admin/adminEvent?adminID=${userDocID}`);
                console.log('API Response:', response.data);
                setAdminEvents(response.data);
            } catch (error) {
                setError(error.message);
            }
        };
        
        const fetchEventsArray = async () => {
            try {
                if (!adminEvents || !adminEvents.eventIDs) return;
        
                const adminEventsPromises = adminEvents.eventIDs.map(async (eventID) => {
                    try {
                        const response = await axios.get(`http://localhost:8001/controllers/ControllerEventDetail?eventID=${eventID}`);
                        return response.data;
                    } catch (err) {
                        console.error(`Error fetching eventID ${eventID}:`, err);
                        return null;
                    }
                });
        
                const resolvedEventsArray = await Promise.all(adminEventsPromises);
                setEventsArray(resolvedEventsArray.filter(Boolean)); 
            } catch (error) {
                setError(error.message);
                console.error("Error in fetchEventsArray:", error);
            }
        };

        useEffect(() => {
            fetchEventsData();
        }, []);

        useEffect(() => {
            if (adminEvents) {
                fetchEventsArray();
            }
        }, [adminEvents]);

      const renderEvents = () => {
        if (!eventsArray || eventsArray.length == 0) {
          return <p>No Events Available</p>
        };
        const cards = [];
        for (let i = 0; i < eventsArray.length; i++) {
          if (i >= 3) {
            break;
          }

          cards.push(
            <EventCard
              key={i}
              event={eventsArray[i]}
            />
          );
        }

        return (
          <div className="dashboard-cards">
            {error ? (
              <p>{error}</p>
            ) : eventsArray.length > 0 ? (
              cards
            ) : (
              <p>No Available Events</p>
            )}
          </div>
        );
      }

        return (
          <div className="dashboard">
            <div className="dashboard-container">
              <Box display="flex" alignItems="center" gap="15px">
                <EventIcon fontSize="large"/>
                <h2>My Events</h2>
              </Box>
              <p>View the details of events</p>
              <div className="dashboard-cards">
                {renderEvents()}
              </div>

              <Box display="flex" alignItems="center" gap="15px">
                    <CreateIcon fontSize="large"/>
                    <h2>Create an Event</h2>
                </Box>
                <p>Organise a new event</p>
                <br></br>
                <Link href="/admin-create-event" className="dashboard-button">Create Event</Link>
            </div>
          </div>
        );
      };

const EventCard = ({ event }) => {
  const startDateTime = new Date(event.startDateTime);
  const endDateTime = new Date(event.endDateTime);

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
    <div className="card">
        <h2>{event.eventName}</h2>
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
          <p>{event.eventLocation}</p>
        </Box>
        <Box display="flex" alignItems="center" gap="10px">
          <AttachMoneyIcon />
          <p>{event.eventPrice}</p>
        </Box>
        <Box display="flex" alignItems="center">
          <Link href="/admin-view-event" className="card-button">View Event</Link>
        </Box>
    </div>
  );
};

    return (
        <main>
            <ResponsiveAppBar />
            <Dashboard />
        </main>
    )
}