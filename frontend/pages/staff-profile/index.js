import React, { useState, useEffect } from 'react';
import './page.css'; // Import the CSS file
import ResponsiveAppBar from '../../components/staff-navbar/navbar'; // Import the staff navbar
import axios from 'axios';
import { useRouter } from 'next/router'; // Import useRouter for navigation
import { url } from '../../src/app/firebase/firebase_config';

export default function StaffProfilePage() {
    const router = useRouter(); // Initialize useRouter for navigation
    const [staffName, setStaffName] = useState("");
    const [staffNumber, setStaffNumber] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [eventInCharge, setEventInCharge] = useState(""); // Assuming this is a future addition or for completeness
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch staff profile data when the component mounts
    useEffect(() => {
        const fetchStaffProfile = async () => {
            try {
                const staffID = localStorage.getItem('userDocID');
                if (!staffID) {
                    setError('Staff ID is missing. Please log in again.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${url}/staff/profile?staffID=${staffID}`);
                const staffData = response.data;

                // Update state with fetched data
                setStaffName(staffData.staffName || "");
                setStaffNumber(staffData.staffPhone || "");
                setCompanyName(staffData.staffCompany || "");
                // If you have more fields like eventInCharge, set them here
                
            } catch (err) {
                console.error('Error fetching staff profile:', err);
                setError('Failed to load staff profile. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchStaffProfile();
    }, []);

    const handleStaffNameChange = (event) => setStaffName(event.target.value);
    const handleStaffNumberChange = (event) => setStaffNumber(event.target.value);
    const handleCompanyNameChange = (event) => setCompanyName(event.target.value);
    const handleEventInChargeChange = (event) => setEventInCharge(event.target.value);

    const updateProfile = async (event) => {
        event.preventDefault();

        const profileData = {
            Name: staffName,
            Phone: staffNumber,
            CompanyName: companyName,
            // Include any additional fields if necessary
        };

        try {
            console.log("INPUT>", profileData);
            const staffID = localStorage.getItem('userDocID');
            if (!staffID) {
                alert('Staff ID is missing. Please log in again.');
                return;
            }

            const response = await axios.post(`${url}/staff/update?staffID=${staffID}`, profileData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Profile successfully updated:', response.data);
            alert('Profile updated successfully!');
            
            // Navigate to another page after successful update, e.g., staff home page
            router.push('/staff-home');

        } catch (error) {
            console.error('Error updating profile:', error);
            alert(`Failed to update profile: ${error.message}`);
        }
    };

    if (loading) {
        return <div>Loading staff profile...</div>; // Display loading state
    }

    if (error) {
        return <div>{error}</div>; // Display error message
    }

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
                        {/* Optionally include eventInCharge or other fields here */}
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
