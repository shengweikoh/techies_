import React from 'react';
import { useState, useEffect } from 'react';
import './page.css';
import ResponsiveAppBar from '../../components/admin-navbar/navbar';
import Link from "next/link";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreateIcon from '@mui/icons-material/Create';
import { Box } from "@mui/material";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import axios from 'axios';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Dynamically import the MapLabeling component with ssr: false
const MapLabeling = dynamic(() => import('./MapLabeling'), { ssr: false });


export default function Page() {
    const Dashboard = () => {

    const [isPictureVisible, setIsPictureVisible] = useState(false);
    const [profilePic, setProfilePic] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const togglePicture = () => {
        setIsPictureVisible(!isPictureVisible);
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log("selected file");
      };
  
      const handleUploadPicture = async () => {
        if (!selectedFile) {
            alert("Please select a file first");
            return;
        }

        const imageRef = ref(storage, `images/${selectedFile.name + v4()}`);
        const userDocID = localStorage.getItem('userDocID');
        //console.log(profilePic.profilePicURL);
        try{
            await uploadBytes(imageRef, selectedFile).then(() => {
            console.log("image uploaded successfully");
            alert("Image Uploaded");
            });

            // // Get the download URL
            // const downloadURL = await getDownloadURL(imageRef);
            // console.log("File available at", downloadURL);
            // // alert(`File available at ${downloadURL}`);

            // Get the download URL
            const downloadURL = await getDownloadURL(imageRef);

            // // Remove the "https://" part from the download URL
            // if (downloadURL.startsWith("https://")) {
            //     downloadURL = downloadURL.replace("https://", "");
            // }

            const profilePicURLS = {
            oldImageURL: profilePic,
            newImageURL: downloadURL,
            instructorID: userDocID
            }

            console.log("File available at", profilePicURLS);

            try {
                const response = await axios.post(`${url}/instructors/profile/updatePicture`, profilePicURLS, {
                    headers: {
                    'Content-Type': 'application/json',
                    },
                });
                console.log('Picture uploaded:', response.data);
                setTimeout(() => {
                setIsPictureVisible(false);
                fetchProfilePic();
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
                    <LocationOnIcon fontSize="large"/>
                    <h2>Create Map</h2>
                </Box>
                <p>Upload an image of your event map</p>
                <button className='dashboard-button' onClick={togglePicture}>Add Map</button>
                {/* <div className='image-container'>
                    <img 
                        src="/assets/sketch1.jpg" 
                        alt="Map Image" 
                        style={{
                            width: '100%',
                            height: 'auto'
                        }}
                    />
                </div> */}
                <div>
                    <MapLabeling />
                </div>

                <div id="pictureOverlay" className={`picture-overlay ${isPictureVisible ? 'show' : ''}`}>
                    <div className='picture-box'>
                    <p style={{fontSize: "25px", margin: "0px"}}>Add Map Image</p>
                    <div className="profile-picture-container">
                        <img src={profilePic ?? ""} className="profile-picture"/>
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