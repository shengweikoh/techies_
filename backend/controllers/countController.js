// controllers/ControllerEventDetail.js

const { db } = require("../firebase/firebase.js"); // Ensure Firebase is initialized correctly

// Update the count of attendees for a specific event
const updateEventCount = async (req, res) => {
    const { eventID } = req.params;
    const { increment } = req.body; // increment should be +1 or -1

    if (!eventID) {
        return res.status(400).json({ code: 400, message: "Event ID is required" });
    }

    try {
        const eventRef = db.collection("Events").doc(eventID);

        // Use Firestore's atomic increment feature
        await eventRef.update({
            count: admin.firestore.FieldValue.increment(increment),
        });

        return res.status(200).json({ code: 200, message: "Event count successfully updated" });
    } catch (error) {
        console.error("Error updating event count:", error);
        return res.status(500).json({ code: 500, message: `Error updating event count: ${error.message}` });
    }
};

module.exports = {
    updateEventCount,
};
