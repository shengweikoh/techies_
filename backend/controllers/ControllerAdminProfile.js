// hvnt test
const {db} = require("../firebase/firebase.js");

const getAdminProfile = async (req, res) => {
    const adminID = req.query.id;
    try {
        const admin = await db.collection("Admin").doc(adminID).get();
        if (!admin.exists) {
            return res.status(404).json({ code: 404, message: "Admin not found" });
        }

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
    const adminID = req.query.id;
    const { Email, Name, Phone } = req.body;

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
        await db.collection("Admin").doc(adminID).update({
            Email: Email,
            Name: Name,
            Phone: Phone,
        });
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
const getAdminEvent = async (req, res) => {
    const adminID = req.query.id;
    try {
        const admin = await db.collection("Admin").doc(adminID).get();
        if (!admin.exists) {
            return res.status(404).json({ code: 404, message: "Admin not found" });
        }
        const adminEvent = await db.collection("Admin").doc(adminID).collection("EventIC").get();
        const validAdminEvent = adminEvent.empty 
        ? [] // Return an empty array if no documents are found
        : adminEvent.docs.map(doc => doc.data()); // Map document data to an array

        return res.status(200).json({
            validAdminEvent: validAdminEvent
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

module.exports = {
    getAdminProfile,
    updateAdminProfile,
    getAdminEvent,
    createAdminProfile
}


