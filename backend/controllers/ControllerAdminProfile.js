// hvnt test
const {db} = require("../firebase/firebase.js");

const getAdminProfile = async (req, res) => {
    const adminID = req.query.adminID;

    if (!adminID || typeof adminID !== 'string' || adminID.trim() === '') {
        return res.status(400).json({ 
            code: 400, 
            message: "Invalid or missing admin ID"
        });
    }

    try {
        const admin = await db.collection("Admin").doc(adminID).get();

        const adminDetails = admin.data();
        const adminEvent = await db.collection("Admin").doc(adminID).collection("EventIC").get();
        const validAdminEvent = adminEvent.empty 
        ? [] // Return an empty array if no documents are found
        : adminEvent.docs.map(doc => doc.data()); // Map document data to an array

        return res.status(200).json({
            adminName: adminDetails.Name,
            adminPhone: adminDetails.Phone,
            adminEmail: adminDetails.Email,
            adminEvent: validAdminEvent,
        });
    } catch (error) {
        return res.status(500).json({code: 500, message: `Error getting admin: ${error} `})
    }
}

const updateAdminProfile = async (req, res) => {
    const adminID = req.query.adminID;
    const { Email, Name, Phone } = req.body;

    if (!adminID || typeof adminID !== 'string' || adminID.trim() === '') {
        return res.status(400).json({ 
            code: 400, 
            message: "Invalid or missing admin ID"
        });
    }

    if (!Email || !Name || !Phone) {
		return res
			.status(400)
			.json({
				code: 400,
				message:
					"User updated email/name/phone required",
			});
	}

    try {
        // Check if the admin document exists
        const adminRef = db.collection("Admin").doc(adminID);
        const adminDoc = await adminRef.get();

        if (!adminDoc.exists) {
            return res.status(404).json({
                code: 404,
                message: "Admin not found.",
            });
        }

        // Update the admin profile with new values
        await adminRef.update({
            Email: Email,
            Name: Name,
            Phone: Phone,
        });

        return res.status(200).json({
            code: 200,
            message: "Admin profile successfully updated.",
        });
    } catch (error) {
        console.error("Error updating admin profile:", error);
        return res.status(500).json({
            code: 500,
            message: `Error updating admin profile: ${error.message}`,
        });
    }
}

const getAdminEvent = async (req, res) => {
    const adminID = req.query.adminID;
    try {
        const admin = await db.collection("Admin").doc(adminID).get();
        if (!admin.exists) {
            return res.status(404).json({ code: 404, message: "Admin not found" });
        }
        const adminEventSnapshot = await db.collection("Admin").doc(adminID).collection("EventIC").get();
        const eventIDs = adminEventSnapshot.empty 
            ? [] // If empty, return an empty array
            : adminEventSnapshot.docs.map(doc => doc.data().EventID); // Extract the EventID field

        return res.status(200).json({
            eventIDs: eventIDs // Send back the array of Event IDs
        });
    } catch (error) {
        return res.status(500).json({code: 500, message: `Error getting admin: ${error} `})
    }
}

const createAdminProfile = async (req, res) => {
    const { Email, Name, Phone } = req.body;

    // Validate request body
    if (!Email || !Name || !Phone) {
        return res.status(400).json({
            code: 400,
            message: "Email, Name, and Phone are required fields.",
        });
    }

    try {
        const newAdminRef = await db.collection("Admin").add({
            Email,
            Name,
            Phone,
        });

        return res.status(201).json({
            code: 201,
            message: "Admin profile successfully created.",
            adminID: newAdminRef.id,
        });
    } catch (error) {
        console.error("Error creating admin profile:", error);
        return res.status(500).json({
            code: 500,
            message: `Error creating admin profile: ${error.message}`,
        });
    }
}
const assignEventStaff = async (req,res) => {
    const { adminID } = req.query;
    const { staffEmail, eventID } = req.body;

    if (!staffEmail || !eventID) {
        return res.status(400).json({
            code: 400,
            message: "staffEmail and eventID are required to assign an event.",
        });
    }

    try {
        const staffSnapshot = await db.collection("Staff").where("Email", "==", staffEmail).get();

        if (staffSnapshot.empty) {
            return res.status(404).json({
                code: 404,
                message: "Staff with the provided email not found.",
            });
        }

        const staffDoc = staffSnapshot.docs[0];
        const staffID = staffDoc.id;
        // Reference to the staff member's subcollection
        const staffEventRef = db.collection("Staff").doc(staffID).collection("EventIC").doc(eventID);

        // Set event details in the subcollection
        await staffEventRef.set({ eventID: eventID });

        const adminEventRef = db.collection("Admin").doc(adminID).collection("EventIC").doc(eventID).collection("StaffEmail").doc(staffEmail);
        await adminEventRef.set({ Email: staffEmail});

        return res.status(200).json({
            code: 200,
            message: "Event successfully assigned to staff member.",
        });
    } catch (error) {
        console.error("Error assigning event to staff:", error);
        return res.status(500).json({
            code: 500,
            message: `Error assigning event to staff: ${error.message}`,
        });
    }
};

module.exports = {
    getAdminProfile,
    updateAdminProfile,
    getAdminEvent,
    createAdminProfile,
    assignEventStaff,
}


