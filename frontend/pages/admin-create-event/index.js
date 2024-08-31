import React from 'react';
import { useState, useEffect } from 'react';
import './page.css';
import ResponsiveAppBar from '../../components/admin-navbar/navbar';
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Page() {
    const router = useRouter();
    const Dashboard = () => {
        const [eventName, setEventName] = useState("");
        const [organiserName, setOrganiserName] = useState("");
        const [organiserContact, setOrganiserContact] = useState("");
        const [location, setLocation] = useState("");
        const [description, setDescription] = useState("");
        const [startDate, setStartDate] = useState("");
        const [endDate, setEndDate] = useState("");
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
        const handleStartDateChange = (event) => setStartDate(event.target.value);
        const handleEndDateChange = (event) => setEndDate(event.target.value);
        const handleStartTimeChange = (event) => setStartTime(event.target.value);
        const handleEndTimeChange = (event) => setEndTime(event.target.value);
        const handlePriceChange = (event) => setPrice(event.target.value);
        const handleAgeLimitChange = (event) => setAgeLimit(event.target.value);
        const handleCapacityChange = (event) => setCapacity(event.target.value);


  const createEvent = async (event) => {
    event.preventDefault();

    const convertDateTime = (input) => {
        // Insert a space between the date and time
        const dateTimeStr = input.slice(0, 10) + ' ' + input.slice(10);
        
        // Create a new Date object from the modified string
        const date = new Date(dateTimeStr);
      
        // Check if date parsing was successful
        if (isNaN(date)) {
          throw new Error('Invalid date format');
        }
      
        // Manually construct the desired format "YYYY-MM-DDTHH:mm:ssZ"
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
      
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
      
        return formattedDate;
    };

    const userDocID = localStorage.getItem('userDocID');

    const eventData = {
        Name: eventName,
        Organiser: organiserName,
        OrganiserContact: Number(organiserContact),
        Location: location,
        Description: description,
        StartDT: convertDateTime(startDate + startTime),
        EndDT: convertDateTime(endDate + endTime),
        Price: Number(price),
        AgeLimit: Number(ageLimit),
        Capacity: Number(capacity),
        OrganiserID: userDocID
    }

    try {
        console.log("INPUT>", eventData);
      const response = await axios.post(`http://localhost:8001/markers/createEvent`, eventData, {
        headers: {
            'Content-Type': 'application/json'
        }
      });
      console.log('Event successfully created:', response.data);

      // Assuming the server responds with the created event's ID
      const eventDocID = response.data.eventDocID;
  
      // Navigate to the next page with eventDocID
      router.push(`/admin-create-map?eventDocID=${eventDocID}`);
  
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

        return (
          <div className="dashboard">
            <div className="dashboard-container">
              <form onSubmit={createEvent}>
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
                        type="tel"
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
                        type="number"
                        required
                        className='large-input'
                        onChange={handlePriceChange}
                    />
                    </div>
                </div>
                <div className='form-container'>
                    <div className='form-item'>
                    <h3>Start Date</h3>
                    <input 
                        type="date"
                        required
                        className='large-input'
                        onChange={handleStartDateChange}
                    />
                    </div>
                    <div className='form-item'>
                    <h3>End Date</h3>
                    <input 
                        type="date"
                        required
                        className='large-input'
                        onChange={handleEndDateChange}
                    />
                    </div>
                </div>
                <div className='form-container'>
                    <div className='form-item'>
                    <h3>Start Time</h3>
                    <input 
                        type="time"
                        required
                        className='large-input'
                        onChange={handleStartTimeChange}
                    />
                    </div>
                    <div className='form-item'>
                    <h3>End Time</h3>
                    <input 
                        type="time"
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
                        type="number"
                        required
                        className='large-input'
                        onChange={handleAgeLimitChange}
                    />
                    </div>
                    <div className='form-item'>
                        <h3>Capacity</h3>
                        <input 
                        type="number"
                        required
                        className='large-input'
                        onChange={handleCapacityChange}
                        />
                    </div>
                </div>
                <div>
                    <br></br>
                    <button type="submit" className="dashboard-button">Continue</button>
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