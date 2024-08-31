import React, { useState } from 'react';
import './page.css'; // Import the CSS file
import ResponsiveAppBar from '../../components/user-navbar/navbar'; // Update to the user navbar
import axios from 'axios';

export default function UserProfilePage() {
    const [userName, setUserName] = useState("");
    const [userNumber, setUserNumber] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [medicalConditions, setMedicalConditions] = useState("");
    const [eventsAttended, setEventsAttended] = useState("");
    const [emergencyContactNumber, setEmergencyContactNumber] = useState("");

    const handleUserNameChange = (event) => setUserName(event.target.value);
    const handleUserNumberChange = (event) => setUserNumber(event.target.value);
    const handleBloodTypeChange = (event) => setBloodType(event.target.value);
    const handleMedicalConditionsChange = (event) => setMedicalConditions(event.target.value);
    const handleEventsAttendedChange = (event) => setEventsAttended(event.target.value);
    const handleEmergencyContactNumberChange = (event) => setEmergencyContactNumber(event.target.value);

    const updateUserProfile = async (event) => {
        event.preventDefault();

        const profileData = {
            userName: userName,
            userPhone: Number(userNumber),
            userBlood: bloodType,
            userMedical: medicalConditions,
            userEmergencyContact: Number(emergencyContactNumber),
        };

        try {
            console.log("INPUT>", profileData);
            const userDocID = localStorage.getItem('userDocID');
            const response = await axios.post(`http://localhost:8001/user/update?userID=${userDocID}`, profileData, {
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
            <ResponsiveAppBar /> {/* Include the user navbar here */}
            <div className="dashboard">
                <div className="dashboard-container">
                    <form onSubmit={updateUserProfile}>
                        <div>
                            <h2>Edit Profile</h2>
                        </div>
                        <div className="form-container">
                            <div className="form-item">
                                <h3>Name</h3>
                                <input 
                                    type="text"
                                    required
                                    className="large-input"
                                    value={userName}
                                    onChange={handleUserNameChange}
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
                                    value={userNumber}
                                    onChange={handleUserNumberChange}
                                />
                            </div>
                        </div>
                        <div className="form-container">
                            <div className="form-item">
                                <h3>Blood Type</h3>
                                <input 
                                    type="text"
                                    required
                                    className="large-input"
                                    value={bloodType}
                                    onChange={handleBloodTypeChange}
                                />
                            </div>
                        </div>
                        <div className="form-container">
                            <div className="form-item">
                                <h3>Medical Conditions</h3>
                                <input 
                                    type="text"
                                    required
                                    className="large-input"
                                    value={medicalConditions}
                                    onChange={handleMedicalConditionsChange}
                                />
                            </div>
                        </div>
                        <div className="form-container">
                            <div className="form-item">
                                <h3>Emergency Contact Number</h3>
                                <input 
                                    type="tel"
                                    required
                                    className="large-input"
                                    value={emergencyContactNumber}
                                    onChange={handleEmergencyContactNumberChange}
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
