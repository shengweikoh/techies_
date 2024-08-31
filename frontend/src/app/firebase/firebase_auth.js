import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import FBInstanceFirestore from "./firebase_db";

class FirebaseAuthentication {
	getAuth() {
		return getAuth();
	}
    async login(auth, email, password) {
        let errorCode = null;
        let data = null;
        try {
            data = await signInWithEmailAndPassword(auth, email, password);
            console.log("login success", data);
        } catch (error) {
            console.error("login error", error);
            errorCode = 1001;
        }
        return { data, errorCode };
    }

    googleLogin = async function (auth) {
        let errorCode = null;
        let data = null;
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          console.log("Google login success", result);
          data = result.user; // Get the signed-in user info
        } catch (error) {
          console.error("Google login error", error);
          errorCode = error.code; // More specific error code
        }
        return { data, errorCode };
    };      

	// handle logout
	logout = function (auth) {
		signOut(auth)
			.then(() => {
				console.log("logout success");
			})
			.catch((error) => {
				console.error("logout error", error);
			});
	};

	// handle user registration
	register(auth, email, password) {
		let errorCode = null;
		try {
		  const userCredentials =  createUserWithEmailAndPassword(auth, email, password);
		  console.log("register success", userCredentials);
		} catch (error) {
		  console.error("register error", error);
		  errorCode = error.code;
		}
		return errorCode;
	  }

    monitorAuthState() {
        onAuthStateChanged(this.auth, (user) => {
          if (user) {
            console.log("User is signed in:", user);
          } else {
            console.log("No user is signed in.");
          }
        });
    }
}

const FBInstanceAuth = new FirebaseAuthentication();
export default FBInstanceAuth;
