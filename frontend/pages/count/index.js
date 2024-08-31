"use client";

import React, { useState, useEffect } from 'react';
import { FirestoreDB } from '../../src/app/firebase/firebase_config';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import styles from './page.css';

const EventCounter = ({ eventID }) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!eventID) return;

    // Real-time listener for count updates
    const eventRef = doc(FirestoreDB, "Events", eventID);
    const unsubscribe = onSnapshot(eventRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        setCount(docSnapshot.data().count);
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [eventID]);

  const handleUpdateCount = async (increment) => {
    try {
      const eventRef = doc(FirestoreDB, "Events", eventID);
      await updateDoc(eventRef, {
        count: increment ? count + 1 : count - 1,
      });
    } catch (error) {
      console.error("Error updating count:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h2>Event Counter</h2>
      <div className={styles.countDisplay}>{count}</div>
      <button className={styles.button} onClick={() => handleUpdateCount(true)}>+</button>
      <button className={styles.button} onClick={() => handleUpdateCount(false)}>-</button>
    </div>
  );
};

export default EventCounter;
