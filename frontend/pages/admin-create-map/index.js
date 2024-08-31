import React from 'react';
import { useState } from 'react';
import './page.css';
import ResponsiveAppBar from '../../components/admin-navbar/navbar';
import { Box } from "@mui/material";
import { storage } from '../../src/app/firebase/firebase_config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Dynamically import the MapLabeling component with ssr: false
const MapLabeling = dynamic(() => import('./MapLabeling'), { ssr: false });

export default function Page() {
    const router = useRouter();
    const { eventDocID } = router.query;
  
    const Dashboard = () => {
        const [isPictureVisible, setIsPictureVisible] = useState(false);
        const [profilePic, setProfilePic] = useState("");
        const [selectedFile, setSelectedFile] = useState(null);
        const [isMapLabelingVisible, setIsMapLabelingVisible] = useState(false); // New state for MapLabeling visibility
        const [mapURL, setMapURL] = useState("");

        const togglePicture = () => {
            setIsPictureVisible(!isPictureVisible);
        }

        const handleFileChange = (event) => {
            setSelectedFile(event.target.files[0]);
        };
    
        const handleUploadPicture = async () => {
            if (!selectedFile) {
                alert("Please select a file first");
                return;
            }

            const imageRef = ref(storage, `images/${selectedFile.name + v4()}`);
            try {
                await uploadBytes(imageRef, selectedFile);
                alert("Image Uploaded");

                const downloadURL = await getDownloadURL(imageRef);
                setMapURL(downloadURL);


                const profilePicURLS = {
                    oldImageURL: profilePic,
                    newImageURL: downloadURL,
                    eventID: eventDocID
                }

                console.log("File available at", profilePicURLS);

                try {
                    const response = await axios.post(`http://localhost:8001/map/update`, profilePicURLS, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    console.log('Picture uploaded:', response.data);
                    setTimeout(() => {
                        setIsPictureVisible(false);
                        setIsMapLabelingVisible(true); // Show MapLabeling after successful upload
                    }, 1000);
                } catch (error) {
                    console.log('Error uploading picture:', error);
                }
            } catch (error) {
                console.error("Error uploading image: ", error);
                alert("Error uploading image");
            }
        }

        return (
            <div className="dashboard">
                <div className="dashboard-container">
                    <Box display="flex" alignItems="center" gap="15px">
                        <LocationOnIcon fontSize="large" />
                        <h2>Create Map</h2>
                    </Box>
                    <p>Upload an image of your event map</p>
                    <button className='dashboard-button' onClick={togglePicture}>Add Map</button>

                    {/* Only show MapLabeling after the image is uploaded */}
                    {isMapLabelingVisible && <MapLabeling eventDocID={eventDocID} imgURL={mapURL} />}

                    <div id="pictureOverlay" className={`picture-overlay ${isPictureVisible ? 'show' : ''}`}>
                        <div className='picture-box'>
                            <p style={{ fontSize: "25px", margin: "0px" }}>Add Map Image</p>
                            <div className="profile-picture-container">
                                <img src={profilePic ?? ""} className="profile-picture" />
                            </div>
                            <div>
                                <input className='custom-file-input' type="file" onChange={handleFileChange} />
                                {selectedFile && <p>File Chosen</p>}
                            </div>
                            <br></br>
                            <div className='buttons-container'>
                                <button className='dashboard-button' onClick={handleUploadPicture}>Upload Picture</button>
                                <button className='dashboard-button' onClick={togglePicture}>Cancel</button>
                            </div>
                        </div>
                    </div>
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