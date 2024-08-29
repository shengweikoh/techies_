"use client";

import React, { useState } from 'react';
import styles from './page.module.css'; // Updated to use the correct module import
import FBInstanceAuth from "../../src/app/firebase/firebase_auth";
import { useRouter } from 'next/router';
import {FirestoreDB, auth} from '../../src/app/firebase/firebase_config';
import { collection, query, where, getDocs, Firestore} from 'firebase/firestore';
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';
// import '../../src/app/components/card/card.css';

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const auth = FBInstanceAuth.getAuth();
	const router = useRouter();
	const [error, setError] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const handleUsernameChange = (event) => {
    setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
	setPassword(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError(null);
	
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			if (user) {
				console.log('Login successful');
				const token = await getIdToken(user);
				console.log('User token:', token);
	
				// Store the token in local storage or cookies
				localStorage.setItem('userToken', token);
	
				const role = await checkUserRole(user.email);
				console.log(role);
				if (role === 'User') {
					router.push('/');
				} else if (role === 'Admin') {
					router.push('/');
				} else if ( role === 'Staff') {
          router.push('/');
        }
			} else {
				setError(`Login failed: ${errorCode}`);
				setShowModal(true);
			}
		} catch (error) {
			setError(`Unexpected error: ${error.message}`);
			setShowModal(true);
		}
	};

	const closeModal = () => {
		setShowModal(false);
		setError(null);
	};
	
	const checkUserRole = async (email) => {
		console.log('Checking user role');
		console.log('db:', FirestoreDB);
    try {
      // Check if email exists in the User collection
      const userQuery = query(collection(FirestoreDB, 'User'), where('Email', '==', email));
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        console.log('User is a Normal User');
        const userDoc = userSnapshot.docs[0];
        console.log("Hello " + userDoc.id);
        // Store the uid in local storage or cookies
        localStorage.setItem('userDocID', userDoc.id);
        localStorage.setItem('userRole', 'user');
        return 'user';
      }
    
      // Check if email exists in the Admin collection
      const adminQuery = query(collection(FirestoreDB, 'Admin'), where('Email', '==', email));
      const adminSnapshot = await getDocs(adminQuery);
      if (!adminSnapshot.empty) {
        console.log('User is an Admin');
        const adminDoc = adminSnapshot.docs[0];
        console.log("Hello " + adminDoc.id);
        // Store the uid in local storage or cookies
        localStorage.setItem('userDocID', adminDoc.id);
        localStorage.setItem('userRole', 'admin');
        return 'admin';
      }
    
      // Check if email exists in the Staff collection
      const staffQuery = query(collection(FirestoreDB, 'Staff'), where('Email', '==', email));
      const staffSnapshot = await getDocs(staffQuery);
      if (!staffSnapshot.empty) {
        console.log('User is a Staff member');
        const staffDoc = staffSnapshot.docs[0];
        console.log("Hello " + staffDoc.id);
        // Store the uid in local storage or cookies
        localStorage.setItem('userDocID', staffDoc.id);
        localStorage.setItem('userRole', 'staff');
        return 'staff';
      }

			console.log('User not found in any role');
			return null;

		} catch (error) {
			console.error('Error checking user role: ', error);
			return null;
		}
	};

	const handleGoogleLogin = (event) => {
	event.preventDefault();
	console.log("google login");
	FBInstanceAuth.googleLogin(auth);
	};

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Welcome to 'app name'</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="checkbox-container">
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>
        <button type="submit" className={styles.button}>
        Login 
        </button>
      </form>
    </div>
  );
}

// // sign in with google 

// import { useState } from 'react';
// import { signIn } from 'next-auth/react';
// import styles from './page.module.css';

// export default function Login() {
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Add your login logic here
//     console.log('Email:', email);
//     console.log('Password:', password);
// };

// return (
//     <div className={styles.container}>
//     <form onSubmit={handleSubmit} className={styles.form}>
//         <h2>Login</h2>
//         <div className={styles.inputGroup}>
//         <label htmlFor="email" className={styles.label}>Email:</label>
//         <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//         />
//         </div>
//         <div className={styles.inputGroup}>
//         <label htmlFor="password" className={styles.label}>Password:</label>
//         <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//         />
//         </div>
//         <button type="submit" className={styles.button}>
//         Login
//         </button>
//     </form>
//     <div className={styles.or}>or</div>
//     <button className={styles.googleButton} onClick={() => signIn('google')}>
//         Sign in with Google
//     </button>
//     </div>
// );
// }

