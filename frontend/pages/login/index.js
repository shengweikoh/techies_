"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/router';
import { FirestoreDB } from '../../src/app/firebase/firebase_config';
import FBInstanceAuth from "../../src/app/firebase/firebase_auth";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signInWithGoogle } from '../../src/app/firebase/firebase_auth';
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const auth = FBInstanceAuth.getAuth();
  const router = useRouter();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event) => {
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
        if (role == 'User') {
          router.push('/user-home');
        } else if (role == 'Admin') { 
          router.push('/admin-home');
        } else if (role == 'Staff') {
          router.push('/staff-home');
        } else {
          setError('Login failed: User role not found');
          // setShowModal(true);
        }
      } else {
        setError('Login failed: User not found');
        // setShowModal(true);
      }
    } catch (error) {
      setError(`Unexpected error: ${error.message}`);
      // setShowModal(true);
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

          // Store the uid and role in local storage
          localStorage.setItem('userDocID', roleDoc.id);
          localStorage.setItem('userRole', role);
          return role;
        }
      }

      console.log('User not found in any role');
      return null;
    } catch (error) {
      console.error('Error checking user role:', error);
      return null;
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log('Google sign-in successful');
      router.push('/');
    } catch (error) {
      setError(`Google login failed: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2>Login to 'app name'</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.checkboxContainer}>
          <label>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={toggleShowPassword}
            />
            Show Password
          </label>
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
        <div className={styles.or}>or</div>
        <button className={styles.googleButton} onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </form>
    </div>
  );
}
