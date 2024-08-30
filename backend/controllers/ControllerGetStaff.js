// hvnt test
const {db} = require("../firebase/firebase.js");

const getStaffProfile = async (req, res) => {
    const staffID = req.query.id;
    try {
        const staff = await db.collection("Staff").doc(staffID).get();
        if (!staff.exists) {
            return res.status(404).json({ code: 404, message: "Event not found" });
        }

        const staffDetails = staff.data();
        const staffEvent = await db.collection("Staff").doc(staffID).collection("EventIC").get();
        const validStaffEvent = staffEvent.empty
        ? [] // Return an empty array if no documents are found
        : staffEvent.docs.map(doc => doc.data()); // Map document data to an array

        return res.status(200).json({
            staffName: staffDetails.Name,
            staffPhone: staffDetails.Phone,
            staffEmail: staffDetails.Email,
            staffEvent: validStaffEvent,
        });
    } catch (error) {
        return res.status(500).json({code: 500, message: `Error getting staff: ${error} `})
    }
}
module.exports = {
    getStaffProfile
}


