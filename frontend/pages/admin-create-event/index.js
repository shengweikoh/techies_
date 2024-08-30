import React from 'react';
import { useState, useEffect } from 'react';
import './page.css';
import ResponsiveAppBar from '../../components/user-navbar/navbar';

export default function Page() {
    const Dashboard = () => {
        const [eventName, setEventName] = useState("");
        const [organiserName, setOrganiserName] = useState("");
        const [organiserContact, setOrganiserContact] = useState("");
        const [location, setLocation] = useState("");
        const [description, setDescription] = useState("");
        const [startTime, setStartTime] = useState("");
        const [endTime, setEndTime] = useState("");
        const [price, setPrice] = useState("");
        const [ageLimit, setAgeLimit] = useState("");
        const [capacity, setCapacity] = useState("");
    
        const handleEventNameChange = (event) => setEventName(event.target.value);
        const handleOrganiserNameChange = (event) => setOrganiserName(event.target.value);
        const handleOrganiserContactChange = (event) => setOrganiserContact(event.target.value);
        const handleLocationChange = (event) => setLocation(event.target.value);
        const handleDescriptionChange = (event) => setDescription(event.target.value);
        const handleStartTimeChange = (event) => setStartTime(event.target.value);
        const handleEndTimeChange = (event) => setEndTime(event.target.value);
        const handlePriceChange = (event) => setPrice(event.target.value);
        const handleAgeLimitChange = (event) => setAgeLimit(event.target.value);
        const handleCapacityChange = (event) => setCapacity(event.target.value);

        const handleSubmit = async (e) => {
            e.preventDefault();
            
            const response = await fetch('/api/create-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            });
        
            if (response.ok) {
            alert('Event created successfully!');
            } else {
            alert('Failed to create event.');
            }
        };
        return (
          <div className="dashboard">
            <div className="dashboard-container">
              <form onSubmit={handleSubmit}>
                <div>
                    <h2>Create an Event</h2>
                </div>
                <div className='form-container'>
                    <div className='form-item'>
                    <h3>Event Name</h3>
                    <input 
                        type="text"
                        required
                        className='large-input'
                        onChange={handleEventNameChange}
                    />
                    </div>
                </div>
                <div className='form-container'>
                    <div className='form-item'>
                    <h3>Description</h3>
                    <input 
                        type="text"
                        required
                        className='large-input'
                        onChange={handleDescriptionChange}
                        style={{
                            width: '100%',  
                            height: '150px', 
                            padding: '10px',
                            fontSize: '16px'}}
                    />
                    </div>
                </div>
                <div className='form-container'>
                    <div className='form-item'>
                    <h3>Organiser Name</h3>
                    <input 
                        type="text"
                        required
                        className='large-input'
                        onChange={handleOrganiserNameChange}
                    />
                    </div>
                    <div className='form-item'>
                        <h3>Organiser Contact</h3>
                        <input 
                        type="text"
                        required
                        className='large-input'
                        onChange={handleOrganiserContactChange}
                        />
                    </div>
                </div>
                <div className='form-container'>
                    <div className='form-item'>
                    <h3>Location</h3>
                    <input 
                        type="text"
                        required
                        className='large-input'
                        onChange={handleLocationChange}
                    />
                    </div>
                    <div className='form-item'>
                    <h3>Price</h3>
                    <input 
                        type="text"
                        required
                        className='large-input'
                        onChange={handlePriceChange}
                    />
                    </div>
                </div>
                <div className='form-container'>
                    <div className='form-item'>
                    <h3>Start Time</h3>
                    <input 
                        type="text"
                        required
                        className='large-input'
                        onChange={handleStartTimeChange}
                    />
                    </div>
                    <div className='form-item'>
                    <h3>End Time</h3>
                    <input 
                        type="text"
                        required
                        className='large-input'
                        onChange={handleEndTimeChange}
                    />
                    </div>
                </div>
                <div className='form-container'>
                    <div className='form-item'>
                    <h3>Age Limit</h3>
                    <input 
                        type="text"
                        required
                        className='large-input'
                        onChange={handleAgeLimitChange}
                    />
                    </div>
                    <div className='form-item'>
                        <h3>Capacity</h3>
                        <input 
                        type="text"
                        required
                        className='large-input'
                        onChange={handleCapacityChange}
                        />
                    </div>
                </div>
                <div>
                    <button type="submit" className='dashboard-button'>Continue</button>
                </div>
                </form>
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