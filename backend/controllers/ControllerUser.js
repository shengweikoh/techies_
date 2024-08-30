// hvnt test
const {db} = require("../firebase/firebase.js");

const getUser = async (req, res) => {
    const userID = req.query.id;
    try {
        const user = await db.collection("User").doc(userID).get();
        if (!user.exists) {
            return res.status(404).json({ code: 404, message: "Event not found" });
        }

        const userDetails = user.data();
        const userEvent = await db.collection("User").doc(userID).collection("Events").get();
        const validUserEvent = userEvent.empty 
        ? [] // Return an empty array if no documents are found
        : userEvent.docs.map(doc => doc.data()); // Map document data to an array

        return res.status(200).json({
            userName: userDetails.Name,
            userPhone: userDetails.Phone,
            userEmergencyContact: userDetails.EContact,
            userEmail: userDetails.Email,
            userEvents: validUserEvent,
        });
    } catch (error) {
        return res.status(500).json({code: 500, message: `Error getting user: ${error} `})
    }
}
module.exports = {
    getUser
}


