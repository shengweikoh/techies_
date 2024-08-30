// hvnt test
const {db} = require("../firebase/firebase.js");

const getUserProfile = async (req, res) => {
    const userID = req.query.id;
    try {
        const user = await db.collection("User").doc(userID).get();
        if (!user.exists) {
            return res.status(404).json({ code: 404, message: "Event not found" });
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
    const userID = req.query.id;
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
    const userID = req.query.id;
    try {
        const user = await db.collection("User").doc(userID).get();
        if (!user.exists) {
            return res.status(404).json({ code: 404, message: "Event not found" });
        }

        const userDetails = user.data();
        const userEvent = await db.collection("Admin").doc(userID).collection("Events").get();
        const validUserEvent = userEvent.empty 
        ? [] // Return an empty array if no documents are found
        : userEvent.docs.map(doc => doc.data()); // Map document data to an array

        return res.status(200).json({
            validUserEvent: validUserEvent
        });
    } catch (error) {
        return res.status(500).json({code: 500, message: `Error getting user: ${error} `})
    }
}

module.exports = {
    getUserProfile,
    updateUserProfile,
    getUserEvent
}


