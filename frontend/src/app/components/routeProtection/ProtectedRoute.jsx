"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true); // Start loading when the auth check begins

            const token = localStorage.getItem('userToken');
            const userRole = localStorage.getItem('userRole');
            
            if (!token) {
                // Redirect to login if token is missing
                router.push('/login');
                return;
            } 

            if (!allowedRoles.includes(userRole)) {
                // Show access denied popup if role is not allowed
                setAccessDenied(true);
                setLoading(false); // Stop loading after setting access denied
            } else {
                setAccessDenied(false);
                setLoading(false); // Stop loading when auth check is complete
            }
        };

        checkAuth();
    }, [router, allowedRoles]);

    const handleClosePopup = () => {
        setAccessDenied(false);
        router.back(); // Go back to the previous route
    };

    // Early return to prevent rendering children until loading is complete or access is granted
    if (loading) {
        return null; // Optionally, return a loading spinner or similar
    }

    return (
        <>
            {accessDenied ? (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Access Denied</h2>
                        <p>You do not have permission to view this page.</p>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            ) : (
                children // Render children only if access is not denied
            )}
        </>
    );
};

export default ProtectedRoute;
