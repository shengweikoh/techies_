import React, { useState } from 'react';
import './page.css'; // Import the CSS file
import ResponsiveAppBar from '../../components/staff-navbar/navbar'; // Update to the staff navbar
import axios from 'axios';

export default function StaffProfilePage() {
    const [staffName, setStaffName] = useState("");
    const [staffNumber, setStaffNumber] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [eventInCharge, setEventInCharge] = useState("");

    const handleStaffNameChange = (event) => setStaffName(event.target.value);
    const handleStaffNumberChange = (event) => setStaffNumber(event.target.value);
    const handleCompanyNameChange = (event) => setCompanyName(event.target.value);
    const handleEventInChargeChange = (event) => setEventInCharge(event.target.value);

    const updateProfile = async (event) => {
        event.preventDefault();

        const profileData = {
            staffName: staffName,
            staffNumber: Number(staffNumber),
            companyName: companyName,
            eventInCharge: eventInCharge,
        };

        try {
            console.log("INPUT>", profileData);
            const response = await axios.put(`http://localhost:8001/staff/update?staffID=${userDocID}`, profileData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Profile successfully updated:', response.data);
            alert(`Profile updated successfully!`);
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred while updating the profile. Please try again.');
        }
    };

    return (
        <main>
            <ResponsiveAppBar /> {/* Include the staff navbar here */}
            <div className="dashboard">
                <div className="dashboard-container">
                    <form onSubmit={updateProfile}>
                        <div>
                            <h2>Edit Profile</h2>
                        </div>
                        <div className="form-container">
                            <div className="form-item">
                                <h3>Staff Name</h3>
                                <input 
                                    type="text"
                                    required
                                    className="large-input"
                                    value={staffName}
                                    onChange={handleStaffNameChange}
                                />
                            </div>
                        </div>
                        <div className="form-container">
                            <div className="form-item">
                                <h3>Number</h3>
                                <input 
                                    type="tel"
                                    required
                                    className="large-input"
                                    value={staffNumber}
                                    onChange={handleStaffNumberChange}
                                />
                            </div>
                        </div>
                        <div className="form-container">
                            <div className="form-item">
                                <h3>Company Name</h3>
                                <input 
                                    type="text"
                                    required
                                    className="large-input"
                                    value={companyName}
                                    onChange={handleCompanyNameChange}
                                />
                            </div>
                        </div>
                        <div className="form-container">
                            <div className="form-item">
                                <h3>Event in Charge</h3>
                                <input 
                                    type="text"
                                    required
                                    className="large-input"
                                    value={eventInCharge}
                                    onChange={handleEventInChargeChange}
                                />
                            </div>
                        </div>
                        <div>
                            <button 
                                type="submit" 
                                className="dashboard-button"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
