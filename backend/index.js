const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const PORT = 8001;
// const { db } = require("./firebase/firebase.js");
const app = express();

// Use built-in express parsers
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

// for user to view events
app.use("/user/event", require("./routers/userEventRouter.js"));

// for user to view profile
app.use("/user/profile", require("./routers/userProfileRouter.js"));

// for staff to view profile
app.use("/staff/profile", require("./routers/staffProfileRouter.js"));	

// for admin to view profile
app.use("/admin/profile", require("./routers/adminProfileRouter.js"));

// for all to view event detail
app.use("/event/detail", require("./routers/eventDetailsRouter.js"));

module.exports = app;