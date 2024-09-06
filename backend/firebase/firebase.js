// require("dotenv").config();
// const admin = require("firebase-admin");
// const serviceAccount = require('./serviceAccountKey.json');

// try {
//   const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://techies.firebaseio.com", // Ensure this URL is correct
//     storageBucket: "techies.appspot.com" // Ensure this is the correct bucket name
//   });

//   const db = admin.firestore();
//   const storage = admin.storage();
//   const bucket = admin.storage().bucket();

//   module.exports = { admin, db, storage, bucket };

// } catch (error) {
//   console.error("Error initializing Firebase:", error);
// }

require("dotenv").config();
const admin = require("firebase-admin");
//const serviceAccount = require('./serviceAccountKey.json');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://techies.firebaseio.com",
	storageBucket: "gs://techies.appspot.com",
});

const db = admin.firestore();
const storage = admin.storage();
const bucket = admin.storage().bucket();

module.exports = { admin, db, storage, bucket };