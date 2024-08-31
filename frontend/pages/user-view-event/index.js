import ResponsiveAppBar from "../../components/user-navbar/navbar";
import React from 'react';
import './page.css';
import Link from "next/link";
import EventIcon from '@mui/icons-material/Event';
import { Box } from "@mui/material";

export default function Page() {

    const Dashboard = () => {
        return (
          <div className="dashboard">
            <div className="dashboard-container">
              <Box display="flex" alignItems="center" gap="15px">
                <EventIcon fontSize="large"/>
                <h2>Event Details</h2>
              </Box>
            </div>
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