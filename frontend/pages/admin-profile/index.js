import React, { useState, useEffect } from 'react';
import './page.css'; // Import the CSS file
import ResponsiveAppBar from '../../components/admin-navbar/navbar';
import axios from 'axios';
import { useRouter } from 'next/router'; // Import useRouter for navigation

export default function AdminProfilePage() {
    const router = useRouter(); // Initialize useRouter for navigation
    const [adminName, setAdminName] = useState(""); // This corresponds to Company Name
    const [adminPhone, setAdminPhone] = useState(""); // This corresponds to Company Phone
    const [adminIC, setAdminIC] = useState(""); // This corresponds to Company IC
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch admin profile data when the component mounts
        const fetchAdminProfile = async () => {
            try {
                const adminID = localStorage.getItem('userDocID'); // Retrieve adminID from localStorage
                if (!adminID) {
                    setError('Admin ID is missing. Please log in again.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:8001/admin/profile?adminID=${adminID}`);
                const adminData = response.data;

                // Update state with fetched data
                setAdminName(adminData.adminName || ""); // Assuming adminName is the Company Name
                setAdminPhone(adminData.adminPhone || ""); // Assuming adminPhone is the Company Phone
                setAdminIC(adminData.adminIC || ""); // Assuming adminIC is the Company IC
                
            } catch (err) {
                console.error('Error fetching admin profile:', err);
                setError('Failed to load admin profile. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminProfile();
    }, []);

    const handleAdminNameChange = (event) => setAdminName(event.target.value);
    const handleAdminPhoneChange = (event) => setAdminPhone(event.target.value);
    const handleAdminICChange = (event) => setAdminIC(event.target.value);

    const updateProfile = async (event) => {
        event.preventDefault();

        const profileData = {
            Name: adminName, // Send as Name, corresponding to Company Name
            Phone: adminPhone, // Send as Phone, corresponding to Company Phone
            IC: adminIC // Send as IC, corresponding to Company IC
        };

        try {
            const adminID = localStorage.getItem('userDocID'); // Retrieve adminID from localStorage
            if (!adminID) {
                throw new Error('Admin document ID not found in localStorage');
            }

            console.log("INPUT>", profileData);
            const response = await axios.post(`http://localhost:8001/admin/update?adminID=${adminID}`, profileData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Profile successfully updated:', response.data);
            alert('Profile updated successfully!');

            // Navigate to another page after successful update, e.g., admin home page
            router.push('/admin-home');

        } catch (error) {
            console.error('Error updating profile:', error);
            alert(`Failed to update profile: ${error.message}`);
        }
    };

    if (loading) {
        return <div>Loading admin profile...</div>; // Display loading state
    }

    if (error) {
        return <div>{error}</div>; // Display error message
    }

    return (
        <main>
            <ResponsiveAppBar /> {/* Include the admin navbar here */}
            <div className="dashboard">
                <div className="dashboard-container">
                    <form onSubmit={updateProfile}>
                        <div>
                            <h2>Edit Profile</h2>
                        </div>
                        <div className="form-container">
                            <div className="form-item">
                                <h3>Company Name</h3>
                                <input 
                                    type="text"
                                    required
                                    className="large-input"
                                    value={adminName}
                                    onChange={handleAdminNameChange}
                                />
                            </div>
                        </div>
                        <div className="form-container">
                            <div className="form-item">
                                <h3>Company Phone</h3>
                                <input 
                                    type="tel"
                                    required
                                    className="large-input"
                                    value={adminPhone}
                                    onChange={handleAdminPhoneChange}
                                />
                            </div>
                        </div>
                        <div className="form-container">
                            <div className="form-item">
                                <h3>Company IC</h3>
                                <input 
                                    type="text"
                                    required
                                    className="large-input"
                                    value={adminIC}
                                    onChange={handleAdminICChange}
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
