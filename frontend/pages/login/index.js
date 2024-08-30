"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import styles from './page.module.css'; // Updated to use the correct module import
import FBInstanceAuth from "../../src/app/firebase/firebase_auth";
import { useRouter } from 'next/router';
import { FirestoreDB } from '../../src/app/firebase/firebase_config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const auth = FBInstanceAuth.getAuth();
  const router = useRouter();

  const handleEmailChange = (event) => {
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

        const role = await getUserRole(user.email);
        console.log(role);

        // Redirect based on user role
        if (role) {
          router.push('/');
        } else {
          setError('Login failed: User role not found');
          setShowModal(true);
        }
      } else {
        setError('Login failed: User not found');
        setShowModal(true);
      }
    } catch (error) {
      setError(`Unexpected error: ${error.message}`);
      setShowModal(true);
    }
  };

  const getUserRole = async (email) => {
    console.log('Checking user role');

    try {
      const roles = ['User', 'Admin', 'Staff'];

      for (const role of roles) {
        const roleQuery = query(collection(FirestoreDB, role), where('Email', '==', email));
        const roleSnapshot = await getDocs(roleQuery);

        if (!roleSnapshot.empty) {
          console.log(`User is a ${role}`);
          const roleDoc = roleSnapshot.docs[0];
          console.log(`Hello ${roleDoc.id}`);

          // Store the uid and role in local storage
          localStorage.setItem('userDocID', roleDoc.id);
          localStorage.setItem('userRole', role.toLowerCase());

          return role.toLowerCase();
        }
      }

      console.log('User not found in any role');
      return null;
    } catch (error) {
      console.error('Error checking user role:', error);
      return null;
    }
  };

  // Updated Google login function
  const handleGoogleLogin = async (event) => {
    event.preventDefault();
    console.log("Google login");
    // Use next-auth's signIn function for Google login
    await signIn('google');
  };

  const closeModal = () => {
    setShowModal(false);
    setError(null);
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
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className={styles.checkboxContainer}>
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
        {/* Moved Google login button here */}
        <div className={styles.or}>or</div>
        <button className={styles.googleButton} onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </form>
      {showModal && (
        <div className={styles.modal}>
          <p>{error}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
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



