// controllers/ControllerEventDetail.js

const { db } = require("../firebase/firebase.js"); // Make sure Firebase is initialized correctly

// Define the getEventDetails function
const getEventDetails = async (req, res) => {
    const eventID = req.query.eventID; // Retrieve the eventID from query parameters

    // Check if eventID is valid
    if (!eventID || typeof eventID !== 'string' || eventID.trim() === '') {
        return res.status(400).json({ 
            code: 400, 
            message: "Invalid or missing event ID"
        });
    }

    try {
        const event = await db.collection("Events").doc(eventID).get();

        if (!event.exists) {
            return res.status(404).json({ code: 404, message: "Event not found" });
        }

        const eventDetails = event.data();
        const startDateTime = eventDetails.StartDT.toDate().toISOString();
        const endDateTime = eventDetails.EndDT.toDate().toISOString();
        const eventName = eventDetails.Name || null;
        const eventPrice = eventDetails.Price || 0;
        const eventDescription = eventDetails.Description || null;
        const eventAgeLimit = eventDetails.AgeLimit || null;

        return res.status(200).json({
            id: eventID,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            eventName: eventName,
            eventPrice: eventPrice,
            eventOrganiser: eventDetails.Organiser,
            eventOrganiserContact: eventDetails.OrganiserContact,
            eventLocation: eventDetails.Location,
            eventDescription: eventDescription,
            eventCapacity: eventDetails.Capacity,
            eventAgeLimit: eventAgeLimit,
        });
    } catch (error) {
        console.error('Error getting event details:', error);
        return res.status(500).json({ code: 500, message: `Error getting event: ${error.message}` });
    }
};

// Export the function properly
module.exports = {
    getEventDetails
};
