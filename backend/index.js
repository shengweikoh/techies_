const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const PORT = 8001;
// const { db } = require("./firebase/firebase.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
	"http://localhost:3000",
  ];
  
  const corsOptions = {
	origin: allowedOrigins,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	credentials: true, // to allow cookies to be sent along with requests
  };
  
app.use(cors(corsOptions));

app.listen(PORT, (error) => {
	if (!error)
		console.log(
			"Server is Successfully Running, and App is listening on port " + PORT
		);
	else console.log("Error occurred, server can't start", error);
});

//routes
app.get("/", (req, res) => {
	res.status(200).json("Welcome, your app is working well");
});

//app.use("/controllers/ControllerEventDetail", require("./routers/eventDetailsRouter.js"));
//app.use("/controllers/ControllerAdminProfile", require("./routers/adminProfileRouter.js"));
//app.use("/controllers/ControllerStaffProfile", require("./routers/staffProfileRouter.js"));
// app.use("/controllers/ControllerUserProfile", require("./routers/userProfileRouter.js"));

// // for user to view events
//app.use("/user/event", require("./routers/userEventRouter.js"));

// for user to view profile
app.use("/user", require("./routers/UserProfileRouter.js"));

// for staff to view profile
app.use("/staff", require("./routers/StaffProfileRouter.js"));	

// for admin to view profile 
app.use("/admin", require("./routers/AdminProfileRouter.js"));

// for all to view event detail - done
app.use("/event/detail", require("./routers/EventDetailsRouter.js"));

// done
app.use("/markers", require("./routers/markerUpdateRoute.js"));

// to return all events to home page
app.use("/user/home", require("./routers/homePageRouter.js"));

app.use("/map", require("./routers/mapRouter.js"));

module.exports = app;