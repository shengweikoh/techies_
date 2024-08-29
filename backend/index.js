const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 8001;
const { db } = require("./firebase/firebase.js");
const app = express();app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

module.exports = app;