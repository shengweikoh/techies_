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
                description: marker.description || "No description provided", // Add description field
                waitTime: marker.waitTime || 0 // Add wait time field, default to 0 if not provided
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
    const { AgeLimit, Capacity, Description, EndDT, Location, Name, Organiser, OrganiserContact, OrganiserID, Price, StartDT } = req.body;
  
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
        OrganiserID: OrganiserID,
        Price: Number(Price),
        StartDT: new Date(StartDT),
        createdAt: new Date(),
      });
  
      // Get the generated ID of the new document
      const eventID = eventDocRef.id;
      console.log('Event created with ID:', eventID);
  
      const adminRef = db.collection("Admin").doc(OrganiserID).collection("EventIC").doc(eventID);
      await adminRef.set({ eventID: eventID });

      
      // Send the event ID back to the client
      return res.status(200).json({ eventID: eventID, message: "Event successfully created" });
    } catch (error) {
      console.error('Error creating event:', error);
      return res.status(500).json({ code: 500, message: `Error creating event: ${error.message}` });
    }
  };

const getMarkers = async (req, res) => {
    const eventID = req.query.eventID; // Assuming the event ID is passed as a query parameter

    if (!eventID) {
        return res.status(400).json({ code: 400, message: "Event ID is required" });
    }

    try {
        // Get the map document associated with the event ID
        const mapDocSnapshot = await db.collection('Maps').where('eventID', '==', eventID).get();

        if (mapDocSnapshot.empty) {
            return res.status(404).json({ code: 404, message: "Map document not found for the given event ID" });
        }

        // Extract the map document reference (assuming there's only one document)
        const mapDocRef = mapDocSnapshot.docs[0].ref;

        // Get all markers from the 'Marker' subcollection
        const markersSnapshot = await mapDocRef.collection('Marker').get();

        if (markersSnapshot.empty) {
            return res.status(404).json({ code: 404, message: "No markers found for the given event" });
        }

        // Extract marker data from the snapshot
        const markers = markersSnapshot.docs.map(doc => ({
            id: doc.id, // Document ID (optional)
            ...doc.data()
        }));

        return res.status(200).json({ code: 200, markers });
    } catch (error) {
        console.error('Error retrieving markers from Firestore:', error);
        return res.status(500).json({ code: 500, message: `Error retrieving markers: ${error.message}` });
    }
};

module.exports = {
    markerUpdate,
    createEvent,
    getMarkers,
};
