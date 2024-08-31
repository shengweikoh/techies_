// hvnt test
const {db} = require("../firebase/firebase.js");

const getUserProfile = async (req, res) => {
    const userID = req.query.userID;
    try {
        const user = await db.collection("User").doc(userID).get();
        if (!user.exists) {
            return res.status(404).json({ code: 404, message: "User not found" });
        }

        const userDetails = user.data();

        return res.status(200).json({
            userName: userDetails.Name,
            userPhone: userDetails.Phone,
            userEmergencyContact: userDetails.EContact,
            userEmail: userDetails.Email,
        });
    } catch (error) {
        return res.status(500).json({code: 500, message: `Error getting user: ${error} `})
    }
}

const updateUserProfile = async (req, res) => {
    const userID = req.query.userID;
    const { EContact, Email, Name, Phone } = req.body;

    if (!EContact || !Email || !Name || !Phone) {
		return res
			.status(400)
			.json({
				code: 400,
				message:
					"User updated emergency contact number/email/name/phone required",
			});
	}
    try {
        await db.collection("User").doc(userID).update({
            EContact: EContact,
            Email: Email,
            Name: Name,
            Phone: Phone,
        })
        return res.status(200).json({
            code: 200,
            message: "User profile successfully updated.",
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return res.status(500).json({
            code: 500,
            message: `Error updating user profile: ${error.message}`,
        });
    }
}

const getUserEvent = async (req, res) => {
    const userID = req.query.userID;
    try {
        const user = await db.collection("User").doc(userID).get();
        if (!user.exists) {
            return res.status(404).json({ code: 404, message: "User not found" });
        }
        const userEvent = await db.collection("User").doc(userID).collection("Events").get();
        const validUserEvent = userEvent.empty 
        ? [] // Return an empty array if no documents are found
        : userEvent.docs.map(doc => doc.data().EventID); // Map document data to an array

        return res.status(200).json({
            validUserEvent: validUserEvent
        });
    } catch (error) {
        return res.status(500).json({code: 500, message: `Error getting user: ${error} `})
    }
}
const createUserProfile = async (req, res) => {
    const { EContact, Email, Name, Phone } = req.body;

    if (!EContact || !Email || !Name || !Phone) {
        return res.status(400).json({
            code: 400,
            message: "Emergency contact and Email, Name, and Phone are required to create a user profile.",
        });
    }

    try {
        const newUserRef = await db.collection("User").add({
            EContact,
            Email,
            Name,
            Phone,
        });

        return res.status(201).json({
            code: 201,
            message: "User profile successfully created.",
            UserID: newUserRef.id,
        });
    } catch (error) {
        console.error("Error creating user profile:", error);
        return res.status(500).json({
            code: 500,
            message: `Error creating user profile: ${error.message}`,
        });
    }
}

const saveEvent = async (req,res) => {
    const userID = req.query.userID;
    const { eventID } = req.body;

    if (!eventID) {
        return res.status(400).json({
            code: 400,
            message: "EventID is required to save the event.",
        });
    }

    try {
        // Reference to the user's Events subcollection
        const userEventRef = db.collection("User").doc(userID).collection("SavedEvent").doc(eventID);

        // Set the eventID in the subcollection (using the eventID as the document ID)
        await userEventRef.set({ eventID: eventID });

        return res.status(200).json({
            code: 200,
            message: "Event successfully saved for the user.",
        });
    } catch (error) {
        console.error("Error saving event for user:", error);
        return res.status(500).json({
            code: 500,
            message: `Error saving event for user: ${error.message}`,
        });
    }
}

const joinEvent = async (req,res) => {
    const userID = req.query.userID;
    const { eventID } = req.body;

    if (!eventID) {
        return res.status(400).json({
            code: 400,
            message: "EventID is required to save the event.",
        });
    }

    try {
        // Reference to the user's Events subcollection
        const userEventRef = db.collection("User").doc(userID).collection("Events").doc(eventID);

        // Set the eventID in the subcollection (using the eventID as the document ID)
        await userEventRef.set({ eventID: eventID });
        
        const eventRef = db.collection("Events").doc(eventID).collection("Attendees").doc(userID);

        await eventRef.set({ userID: userID });

        return res.status(200).json({
            code: 200,
            message: "Event successfully joined for the user.",
        });

    } catch (error) {
        console.error("Error joining event for user:", error);
        return res.status(500).json({
            code: 500,
            message: `Error joining event for user: ${error.message}`,
        });
    }
}


module.exports = {
    getUserProfile,
    updateUserProfile,
    getUserEvent,
    createUserProfile,
    saveEvent,
    joinEvent,
}


