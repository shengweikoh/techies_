import ResponsiveAppBar from "../../components/user-navbar/navbar";
import React from 'react';
import './page.css';
import Link from "next/link";
import EventIcon from '@mui/icons-material/Event';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CreateIcon from '@mui/icons-material/Create';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box } from "@mui/material";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';

export default function Page() {

    const Dashboard = () => {
      const [eventsData, setEventsData] = useState(null);
      const [savedEventsData, setSavedEventsData] = useState(null);
      const [eventsArray, setEventsArray] = useState([]);
      const [error, setError] = useState(null);

      useEffect(() => {
        fetchEventsData();
        fetchSavedEventsData();
      }, []);
    
      const fetchSavedEventsData = async () => {
        try {
          const userDocID = localStorage.getItem('userDocID');
          if (!userDocID) {
              throw new Error('User document ID not found in localStorage');
          }
            const response = await axios.get(`http://localhost:8001/user/userSaved?userID=${userDocID}`);
            console.log('API Response:', response.data);
            setSavedEventsData(response.data);
        } catch (error) {
            setError(error.message);
        }
      };

      const fetchEventsArray = async () => {
        try {
            if (!savedEventsData || !savedEventsData.validUserEvent) return;
    
            const savedEventsDataPromises = savedEventsData.validUserEvent.map(async (eventID) => {
                try {
                    const response = await axios.get(`http://localhost:8001/event/detail?eventID=${eventID}`);
                    return response.data;
                } catch (err) {
                    console.error(`Error fetching eventID ${eventID}:`, err);
                    return null;
                }
            });
    
            const resolvedEventsArray = await Promise.all(savedEventsDataPromises);
            setEventsArray(resolvedEventsArray.filter(Boolean)); 
        } catch (error) {
            setError(error.message);
            console.error("Error in fetchEventsArray:", error);
        }
    };

    useEffect(() => {
      if (savedEventsData) {
          fetchEventsArray();
      }
  }, [savedEventsData]);

      const renderSavedEvents = () => {
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

      const fetchEventsData = async () => {
        try {
            const response = await axios.get(`http://localhost:8001/user/home`);
            console.log('API Response:', response.data);
            setEventsData(response.data);
        } catch (error) {
            setError(error.message);
        }
      };


      const renderEvents = () => {
        if (!eventsData) {
          return <p>No Events Available</p>
        };
        const cards = [];
        for (let i = 0; i < eventsData.events.length; i++) {
          if (i >= 3) {
            break;
          }
          cards.push(
            <EventCard
              key={i}
              event={eventsData.events[i]}
            />
          );
        }

        return (
          <div className="dashboard-cards">
            {error ? (
              <p>{error}</p>
            ) : eventsData.events.length > 0 ? (
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
                <BookmarkBorderIcon fontSize="large"/>
                <h2>Saved Events</h2>
              </Box>
              <div className="dashboard-cards">
                {renderSavedEvents()}
              </div>
              <Box display="flex" alignItems="center" gap="15px">
                <EventIcon fontSize="large"/>
                <h2>Ongoing Events</h2>
              </Box>
              <p>Popular events currently in Singapore</p>
              <div className="dashboard-cards">
                {renderEvents()}
              </div>
            </div>
          </div>
        );
      };

const EventCard = ({ event }) => {
  const startDateTime = new Date(event.startDateTime);
  const endDateTime = new Date(event.endDateTime);
  const router = useRouter();
  const eventDocID = event.id;

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

  const handleClick = (eventDocID) => {
    router.push(`/user-view-event?eventDocID=${eventDocID}`);
  };

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
          <button onClick={() => handleClick(eventDocID)} className="card-button">View Event</button>
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