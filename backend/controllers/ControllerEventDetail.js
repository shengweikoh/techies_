// hvnt test
const {db} = require("../firebase/firebase.js");

const getEventDetails = async (req, res) => {
    const eventID = req.query.id;
    try {
        const event = await db.collection("Events").doc(eventID).get();
        if (!event.exists) {
            return res.status(404).json({ code: 404, message: "Event not found" });
        }

        //const eventSnapshot = await db.collection("Events").doc(eventID).collection("").get();
        //const eventDetails = await Promise.all(event.docs.map(async (doc) => {
        const eventDetails = event.data();
        const startDateTime = eventDetails.StartDT.toDate().toISOString();
        const endDateTime = eventDetails.EndDT.toDate().toISOString();
        const eventName = eventDetails.Name || null;
        const eventPrice = eventDetails.Price || 0;
        const eventDescription = eventDetails.Description || null;
        const eventAgeLimit = eventDetails.AgeLimit || null;

        return res.status(200).json({
            id: eventID,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            eventName: eventName,
            eventPrice: eventPrice,
            eventOrganiser: eventDetails.Organiser,
            eventOrganiserContact: eventDetails.OrganiserContact,
            eventLocation: eventDetails.Location,
            eventDescription: eventDescription,
            eventCapacity: eventDetails.Capacity,
            eventAgeLimit: eventAgeLimit,
        });
    } catch (error) {
        return res.status(500).json({code: 500, message: `Error getting event: ${error} `})
    }
}
const createEvent = async (req, res) => {
    const { StartDT, EndDT, Name, Price, Organiser, OrganiserContact, Location, Description, Capacity, AgeLimit } = req.body;

    if (!StartDT || !EndDT || !Name || !Organiser || !OrganiserContact || !Location || !Capacity) {
        return res.status(400).json({
            code: 400,
            message: "Start date/time, end date/time, name, organiser, organiser contact, location, and capacity are required fields.",
        });
    }

    try {
        // Create a new event document in the "Events" collection
        const newEventRef = await db.collection("Events").add({
            StartDT: new Date(StartDT), // Ensure StartDT is a Date object
            EndDT: new Date(EndDT), // Ensure EndDT is a Date object
            Name,
            Price: Price || 0,
            Organiser,
            OrganiserContact,
            Location,
            Description: Description || null,
            Capacity,
            AgeLimit: AgeLimit || null,
        });

        return res.status(201).json({
            code: 201,
            message: "Event successfully created.",
            eventID: newEventRef.id,
        });
    } catch (error) {
        console.error("Error creating event:", error);
        return res.status(500).json({
            code: 500,
            message: `Error creating event: ${error.message}`,
        });
    }
};
module.exports = {
    getEventDetails,
    createEvent
}

// const { db } = require("../firebase/firebase.js");

// const getInfo = async (req, res) => {
// 	const studentID = req.query.id;

// 	// try {
// 	//     const studentDoc = await db.collection("students").doc(studentID).get();
// 	//     if (!studentDoc) {
// 	//         return res.status(404).json({code: 404, message: "Student not found"})
// 	//     }
// 	//     const studentInfo = studentDoc.data();
// 	//     const {upcomingLessons, completedLessons, ...filteredData } = studentInfo;
// 	//     return res.status(200).json({code: 200, data: filteredData});
// 	// }
// 	try {
// 		// Fetch student document
// 		const studentDoc = await db
// 			.collection("students")
// 			.doc(studentID)
// 			.get();
// 		if (!studentDoc.exists) {
// 			return res.status(404).json({ code: 404, message: "Student not found" });
// 		}
// 		const studentInfo = studentDoc.data();
// 		const { upcomingLessons, completedLessons, instructor, ...filteredData } =
// 			studentInfo;

// 		let fullname = "";
// 		if (instructor == "") {
// 			fullname = "";
// 			filteredData.instructorFullName = fullname;
// 			return res.status(200).json({ code: 200, data: filteredData });
// 		}
	
// 		// Fetch instructor document
// 		const instructorDoc = await db
// 			.collection("instructors")
// 			.doc(instructor)
// 			.get();

// 		const { firstName, lastName = [] } = instructorDoc.data();
// 		fullname = `${lastName} ${firstName}`;

// 		// Add instructor full name to the response data
// 		filteredData.instructorFullName = fullname;

// 		return res.status(200).json({ code: 200, data: filteredData });
// 	} catch (error) {
// 		return res.status(404).send(`Error getting info: ${error}`);
// 	}
// };

// const updateInfo = async (req, res) => {
// 	const { studentID, firstname, lastname, birthdate } = req.body;

// 	if (!studentID || !firstname || !lastname || !birthdate) {
// 		return res
// 			.status(400)
// 			.json({
// 				code: 400,
// 				message:
// 					"Student Doc ID and updated firstname/lastname/birthdate required",
// 			});
// 	}

// 	try {
// 		await db.collection("students").doc(studentID).update({
// 			firstName: firstname,
// 			lastName: lastname,
// 			birthdate: birthdate,
// 		});
// 		return res
// 			.status(200)
// 			.json({ code: 200, message: "Information successfully is updated" });
// 	} catch (error) {
// 		return res
// 			.status(500)
// 			.json({ code: 500, message: `Error updating info: ${error}` });
// 	}
// };

// module.exports = {
// 	updateInfo,
// 	getInfo,
// };




