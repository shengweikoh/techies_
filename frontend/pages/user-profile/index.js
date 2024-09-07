import React, { useState, useEffect } from 'react';
import './page.css'; // Import the CSS file
import ResponsiveAppBar from '../../components/user-navbar/navbar'; // Update to the user navbar
import axios from 'axios';
import { useRouter } from 'next/router';
import { url } from '../../src/app/firebase/firebase_config';

export default function UserProfilePage() {
    const [userName, setUserName] = useState("");
    const [userNumber, setUserNumber] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [medicalConditions, setMedicalConditions] = useState("");
    const [emergencyContactName, setEmergencyContactName] = useState("");
    const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to track error

    const router = useRouter();
    useEffect(() => {
        // Fetch user profile data when the component mounts
        const fetchUserProfile = async () => {
            try {
                const userDocID = localStorage.getItem('userDocID');
                if (!userDocID) {
                    setError('User ID is missing. Please log in again.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${url}/user/profile?userID=${userDocID}`);
                const userData = response.data;

                // Update state with fetched data
                setUserName(userData.Name || "");
                setUserNumber(userData.Phone || "");
                setBloodType(userData.Blood || "");
                setMedicalConditions(userData.Medical || "");
                setEmergencyContactName(userData.EContact?.Name || "");
                setEmergencyContactNumber(userData.EContact?.Phone || "");
                
            } catch (err) {
                console.error('Error fetching user profile:', err);
                setError('Failed to load user profile. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);


    const handleUserNameChange = (event) => setUserName(event.target.value);
    const handleUserNumberChange = (event) => setUserNumber(event.target.value);
    const handleBloodTypeChange = (event) => setBloodType(event.target.value);
    const handleMedicalConditionsChange = (event) => setMedicalConditions(event.target.value);
    const handleEmergencyContactNameChange = (event) => setEmergencyContactName(event.target.value);
    const handleEmergencyContactNumberChange = (event) => setEmergencyContactNumber(event.target.value);

    const updateUserProfile = async (event) => {
        event.preventDefault();

        const profileData = {
            Name: userName,
            Phone: userNumber,
            BloodType: bloodType,
            MedicalConditions: medicalConditions,
            EContact: {
                Name: emergencyContactName,
                Phone: emergencyContactNumber
            }
        };

        try {
            console.log("INPUT>", profileData);
            const userDocID = localStorage.getItem('userDocID');
            const response = await axios.post(`${url}/user/update?userID=${userDocID}`, profileData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Profile successfully updated:', response.data);
            alert('Profile updated successfully!');
            
            router.push('/user-home');

        } catch (error) {
            console.error('Error updating profile:', error);
            alert(`Failed to update profile: ${error.message}`);
        }
    };

    if (loading) {
        return <div>Loading user profile...</div>; // Display loading state
    }

    if (error) {
        return <div>{error}</div>; // Display error message
    }

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
                                <h3>Emergency Contact Name</h3>
                                <input 
                                    type="text"
                                    required
                                    className="large-input"
                                    value={emergencyContactName}
                                    onChange={handleEmergencyContactNameChange}
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
