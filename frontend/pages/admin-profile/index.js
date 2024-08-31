import React, { useState } from 'react';
import './page.css'; // Import the CSS file
import ResponsiveAppBar from '../../components/admin-navbar/navbar';
import axios from 'axios';

export default function AdminProfilePage() {
    const [companyName, setCompanyName] = useState("");
    const [companyNumber, setCompanyNumber] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [personInCharge, setPersonInCharge] = useState("");

    const handleCompanyNameChange = (event) => setCompanyName(event.target.value);
    const handleCompanyNumberChange = (event) => setCompanyNumber(event.target.value);
    const handleCompanyEmailChange = (event) => setCompanyEmail(event.target.value);
    const handlePersonInChargeChange = (event) => setPersonInCharge(event.target.value);

    const updateProfile = async (event) => {
        event.preventDefault();

        const profileData = {
            companyName: companyName,
            companyNumber: Number(companyNumber),
            companyEmail: companyEmail,
            personInCharge: personInCharge,
        };

        try {
            console.log("INPUT>", profileData);
            const response = await axios.put(`http://localhost:8001/admin/createAdmin?userID=${userDocID}`, profileData, {
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
                                    value={companyName}
                                    onChange={handleCompanyNameChange}
                                />
                            </div>
                        </div>
                        <div className="form-container">
                            <div className="form-item">
                                <h3>Company Number</h3>
                                <input 
                                    type="tel"
                                    required
                                    className="large-input"
                                    value={companyNumber}
                                    onChange={handleCompanyNumberChange}
                                />
                            </div>
                        </div>
                        <div className="form-container">
                            <div className="form-item">
                                <h3>Company Email</h3>
                                <input 
                                    type="email"
                                    required
                                    className="large-input"
                                    value={companyEmail}
                                    onChange={handleCompanyEmailChange}
                                />
                            </div>
                        </div>
                        <div className="form-container">
                            <div className="form-item">
                                <h3>Person in Charge</h3>
                                <input 
                                    type="text"
                                    required
                                    className="large-input"
                                    value={personInCharge}
                                    onChange={handlePersonInChargeChange}
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
