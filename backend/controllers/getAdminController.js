// hvnt test
const {db} = require("../firebase/firebase.js");

const getAdminProfile = async (req, res) => {
    const adminID = req.query.id;
    try {
        const admin = await db.collection("Admin").doc(adminID).get();
        if (!admin.exists) {
            return res.status(404).json({ code: 404, message: "Event not found" });
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
module.exports = {
    getAdminProfile
}


