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
module.exports = {
    getUserProfile
}


