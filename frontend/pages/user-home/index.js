import ResponsiveAppBar from "../../components/navbar/navbar";
import React from 'react';
import './page.css';

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
              <h2>Ongoing Events</h2>
              <p>Popular events currently in Singapore</p>
              <div>
                <Card1 />
                <Card2 />
                <Card3 />
              </div>
            </div>
      
            <div className="dashboard-container">
              <h2>Join an Event</h2>
              <p>Search for an event to join</p>
              <div className="dashboard-details">
                <span>1 hr</span>
                <span>$70</span>
              </div>
              <button className="dashboard-button">Book Now</button>
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