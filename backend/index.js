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
	"http://techies2024.vercel.app",
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

// for user to view profile
app.use("/user", require("./routers/UserProfileRouter.js"));

// for staff to view profile
app.use("/staff", require("./routers/StaffProfileRouter.js"));	

// for admin to view profile 
app.use("/admin", require("./routers/AdminProfileRouter.js"));

// for all to view event detail - done
app.use("/event/detail", require("./routers/EventDetailsRouter.js"));

// to display the markers on the leaflet
app.use("/markers", require("./routers/markerUpdateRoute.js"));

// to return all events to home page
app.use("/user/home", require("./routers/homePageRouter.js"));


app.use("/map", require("./routers/mapRouter.js"));

module.exports = app;