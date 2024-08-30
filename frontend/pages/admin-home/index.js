import ResponsiveAppBar from "../../components/admin-navbar/navbar";
import React from 'react';
import './page.css';
import Link from "next/link";
import EventIcon from '@mui/icons-material/Event';
import CreateIcon from '@mui/icons-material/Create';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box } from "@mui/material";

export default function Page() {

  const Card = ({ title, dateRange, location }) => {
    return (
        <div className="card">
            <div className="card-content">
                <h2>{title}</h2>
                <Box display="flex" alignItems="center" gap="15px">
                    <CalendarMonthIcon />
                    <p>{dateRange}</p>
                </Box>
                <Box display="flex" alignItems="center" gap="15px">
                    <LocationOnIcon />
                    <p>{location}</p>
                </Box>
            </div>
            <button className="card-button">View Event</button>
        </div>
    );
};

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="dashboard-container">
                <Box display="flex" alignItems="center" gap="15px">
                    <EventIcon fontSize="large"/>
                    <h2>My Events</h2>
                </Box>
                <p className="p-events">View your events</p>
                <div className="dashboard-cards">
                    <Card title="Singapore Night Festival 2024" dateRange="23 Aug 24 - 7 Sep 24" location="Bras Basah/Bugis" />
                    <Card title="Halloween Horror Nights 2024" dateRange="30 Aug 24 - 3 Nov 24" location="Universal Studios Singapore" />
                    <Card title="Christmas Wonderland 2024" dateRange="1 Dec 24 - 1 Jan 25" location="Gardens By The Bay" />
                </div>

                <Box display="flex" alignItems="center" gap="15px">
                    <CreateIcon fontSize="large"/>
                    <h2>Create an Event</h2>
                </Box>
                <p>Organise a map for a new event</p>
                <div className="dashboard-details">
                </div>
                <Link href="/admin-create-event" className="dashboard-button">Create Event</Link>
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