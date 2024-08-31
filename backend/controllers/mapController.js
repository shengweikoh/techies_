const { db, storage, bucket } = require("../firebase/firebase.js");

const getMapPicture = async (req, res) => {
    const eventID = req.query.id;
    try {
        const eventDoc = await db.collection("Event").doc(eventID).get();
        if (!eventDoc) {
            return res.status(404).send("Event not found");
        }
        const eventMapURL = eventDoc.data().eventMapURL;
        return res.status(200).json({ code: 200, eventMapURL: eventMapURL });
    }
    catch (error) {
        return res.status(500).send('Error getting picture: ' + error.message);
    }
}

function getFilePathFromUrl(url) {
    const decodedUrl = decodeURIComponent(url);
    const regex = /firebasestorage\.googleapis\.com\/v0\/b\/techies\.appspot\.com\/o\/(.+?)\?alt=media/;
    const match = decodedUrl.match(regex);
    if (match) {
        return match[1].replace(/%2F/g, '/'); // Replace %2F with /
    } else {
        throw new Error('Invalid URL format');
    }
}

const updateMapPicture = async (req, res) => {
    const { oldImageURL, newImageURL, eventID } = req.body;
    console.log("update map picture");

    try {
        if (oldImageURL != "") {
            const filePath = getFilePathFromUrl(oldImageURL);
            await bucket.file(filePath).delete();
        }
        
        await db.collection("Event").doc(eventID).update({
            eventMapURL: newImageURL
        });
        return res.status(200).send('Old profile image deleted from storage and new profile image updated successfully');
    }
    catch (error) {
        console.error('Error during profile picture update:', error);
        return res.status(500).send('Failed to delete image: ' + error.message);
    }
}

module.exports = {
    getMapPicture,
    updateMapPicture,
}