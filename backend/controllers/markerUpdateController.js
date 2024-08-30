const { db } = require("../firebase/firebase.js"); // Ensure you have initialized Firebase correctly

const markerUpdate = async (req, res) => {
    // Extract the markers from the request body
    const { markers } = req.body;
    const eventID = req.query.eventID; // Assuming you want to associate markers with an event ID

    if (!markers || !Array.isArray(markers)) {
        return res.status(400).json({ code: 400, message: "Invalid markers data" });
    }

    try {
        // Create a new document under the 'Maps' collection with a unique ID
        const mapDocRef = db.collection('Maps').doc(); 
        // Set the event ID on the parent document
        await mapDocRef.set({ eventID });

        // Create a batch to perform multiple writes in a single request
        const batch = db.batch();

        // Iterate over the markers and add them to the 'Marker' subcollection
        markers.forEach((marker) => {
            const markerDocRef = mapDocRef.collection('Marker').doc();
            batch.set(markerDocRef, {
                lat: marker.position.lat,
                lng: marker.position.lng,
                label: marker.label,
                code: marker.color, // Assuming 'color' is stored as 'code'
            });
        });

        // Commit the batch write
        await batch.commit();

        return res.status(200).json({ code: 200, message: "Markers successfully stored in Firestore" });
    } catch (error) {
        console.error('Error saving markers to Firestore:', error);
        return res.status(500).json({ code: 500, message: `Error saving markers: ${error.message}` });
    }
};

// controllers/markerUpdateController.js
const createEvent = async (req, res) => {
    // Destructure event details from request body
    const { AgeLimit, Capacity, Description, EndDT, Location, Name, Organiser, OrganiserContact, Price, StartDT } = req.body;
  
    try {
      // Create a new document in the "Events" collection with the provided data
      const eventDocRef = await db.collection('Events').add({
        AgeLimit: Number(AgeLimit),
        Capacity: Number(Capacity),
        Description: Description,
        EndDT: new Date(EndDT),
        Location: Location,
        Name: Name,
        Organiser: Organiser,
        OrganiserContact: Number(OrganiserContact),
        Price: Number(Price),
        StartDT: new Date(StartDT),
        createdAt: new Date(),
      });
  
      // Get the generated ID of the new document
      const eventID = eventDocRef.id;
      console.log('Event created with ID:', eventID);
  
      // Send the event ID back to the client
      return res.status(200).json({ eventID: eventID, message: "Event successfully created" });
    } catch (error) {
      console.error('Error creating event:', error);
      return res.status(500).json({ code: 500, message: `Error creating event: ${error.message}` });
    }
  };

module.exports = {
    markerUpdate,
    createEvent,
};
