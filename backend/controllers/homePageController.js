const { db } = require("../firebase/firebase.js"); // Ensure Firebase is initialized correctly

// Define the getAllEvents function to retrieve all events
const getAllEvents = async (req, res) => {
    try {
        // Fetch all documents from the "Events" collection
        const eventsSnapshot = await db.collection("Events").get();

        // Check if any events exist
        if (eventsSnapshot.empty) {
            return res.status(404).json({ code: 404, message: "No events found" });
        }

        // Map each event document to an object
        const events = eventsSnapshot.docs.map((doc) => {
            const eventDetails = doc.data();
            return {
                id: doc.id,
                startDateTime: eventDetails.StartDT.toDate().toISOString(),
                endDateTime: eventDetails.EndDT.toDate().toISOString(),
                eventName: eventDetails.Name || null,
                eventPrice: eventDetails.Price || 0,
                eventOrganiser: eventDetails.Organiser,
                eventOrganiserContact: eventDetails.OrganiserContact,
                eventLocation: eventDetails.Location,
                eventDescription: eventDetails.Description || null,
                eventCapacity: eventDetails.Capacity,
                eventAgeLimit: eventDetails.AgeLimit || null,
            };
        });

        return res.status(200).json({ code: 200, events });
    } catch (error) {
        console.error('Error getting events:', error);
        return res.status(500).json({ code: 500, message: `Error getting events: ${error.message}` });
    }
};

module.exports = {
    getAllEvents,
};
