"use client";

import React, { useState } from 'react';
import styles from './page.module.css'; // Ensure this path is correct
import { auth, FirestoreDB } from '../../src/app/firebase/firebase_config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation'; // Correct import for Next.js router
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("User");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
  
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    try {
      // Step 1: Create user in Firebase Authentication
      const userSignup = await createUserWithEmailAndPassword(auth, email, password);
      const user = userSignup.user;
      console.log('User created:', user.uid);
  
      // Step 2: Get the ID token for the signed-up user
      const token = await getIdToken(user);
  
      // Step 3: Determine the Firestore collection based on the selected role
      const collectionName = role;
      console.log('Role:', role);
    
      // Step 4: Save user information in Firestore under the correct collection
      await setDoc(doc(FirestoreDB, collectionName, user.uid), {
        Email: user.email,});
      console.log('User document created in Firestore');
  
      // Step 6: Store the token and role in local storage
      localStorage.setItem('userToken', token);
      localStorage.setItem('userRole', role);
      console.log('Token stored in local storage');
  
      // Step 7: Redirect based on user role
      if (role === 'User') {
        router.push('/user-home');
      } else if (role === 'Admin') { 
        router.push('/admin-home');
      } else if (role === 'Staff') {
        router.push('/staff-home');
      } else {
        setError('Login failed: User role not found');
      }
    } catch (error) {
      console.error('Error creating user:', error.message); // Log only the error message
      setError(`Sign-up failed: ${error.message}`);
    }
  };
  

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Sign Up Page</h2>
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
        <div className={styles.inputGroup}>
          <label htmlFor="confirm-password" className={styles.label}>Confirm Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Select Role:</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                value="User"
                checked={role === "User"}
                onChange={handleRoleChange}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                value="Admin"
                checked={role === "Admin"}
                onChange={handleRoleChange}
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                value="Staff"
                checked={role === "Staff"}
                onChange={handleRoleChange}
              />
              Staff
            </label>
          </div>
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
          Sign Up
        </button>
      </form>
    </div>
  );
}
