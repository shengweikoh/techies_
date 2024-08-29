import ResponsiveAppBar from "../../components/admin-navbar/navbar";
import React from 'react';
import './page.css';
import Link from "next/link";

export default function Page() {

    const Card1 = () => {
        return (
        <div className="card">
            <h2>Singapore Night Festival 2024</h2>
            <p>23 Aug 24 - 7 Sep 24</p>
            <p>Bras Basah/Bugis</p>
            <button className="card-button">View Event</button>
        </div>
        );
    };

    const Card2 = () => {
        return (
        <div className="card">
            <h2>Halloween Horror Nights 2024</h2>
            <p>30 Aug 24 - 3 Nov 24</p>
            <p>Universal Studios Singapore</p>
            <button className="card-button">View Event</button>
        </div>
        );
    };

    const Card3 = () => {
        return (
        <div className="card">
            <h2>Christmas Wonderland 2024</h2>
            <p>1 Dec 24 - 1 Jan 25</p>
            <p>Gardens By The Bay</p>
            <button className="card-button">View Event</button>
        </div>
        );
    };
    

    const Dashboard = () => {
        return (
          <div className="dashboard">
            <div className="dashboard-container">
              <h2>My Events</h2>
              <p>View your events</p>
              <div className="dashboard-cards">
                <Card1 />
                <Card2 />
                <Card3 />
              </div>
              <h2>Create an Event</h2>
              <div className="dashboard-details">
              </div>
              <Link href="/admin-create-event"  className="dashboard-button">Create Event</Link>
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