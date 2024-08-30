// hvnt test
const {db} = require("../firebase/firebase.js");

const getEventDetails = async (req, res) => {
    const eventID = req.query.id;
    try {
        const event = await db.collection("Events").doc(eventID).get();
        if (!event.exists) {
            return res.status(404).json({ code: 404, message: "Event not found" });
        }

        //const eventSnapshot = await db.collection("Events").doc(eventID).collection("").get();
        //const eventDetails = await Promise.all(event.docs.map(async (doc) => {
        const eventDetails = event.data();
        const startDateTime = eventDetails.StartDT.toDate().toISOString();
        const endDateTime = eventDetails.EndDT.toDate().toISOString();
        const eventName = eventDetails.Name || null;
        const eventPrice = eventDetails.Price || 0;
        const eventDescription = eventDetails.Description || null;
        const eventAgeLimit = eventDetails.AgeLimit || null;

        return res.status(200).json({
            id: event.id,
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
        return res.status(500).json({code: 500, message: `Error getting event: ${error} `})
    }
}
module.exports = {
    getEventDetails
}


