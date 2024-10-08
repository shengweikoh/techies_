import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StaffRoute from '../src/app/components/routeProtection/StaffRoute';
import UserRoute from '../src/app/components/routeProtection/UserRoute';
import AdminRoute from '../src/app/components/routeProtection/AdminRoute';
import '../src/app/components/routeProtection/popup.css';


// Routes that don't require authentication
const noAuthRequired = ['/', '/login', '/signup', '/count']; 
// Routes that require user authentication
const userRoutes = ['/user-home', '/user-view-event', '/user-profile'];
// Routes that require admin authentication
const adminRoutes = ['/admin-home', '/admin-view-event', '/admin-create-event', '/admin-create-map', '/admin-profile'];
// Routes that require staff authentication
const staffRoutes = ['/staff-home', '/staff-view-event', '/staff-profile']; 

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Wait for router to be ready before rendering protected routes
        if (router.isReady) {
            setLoading(false);
        }
    }, [router.isReady]);

    const getProtectedRoute = () => {
        if (noAuthRequired.includes(router.pathname)) {
            return <Component {...pageProps} />;
        } else if (userRoutes.includes(router.pathname)) {
            return (
                <UserRoute>
                    <Component {...pageProps} />
                </UserRoute>
            );
        } else if (adminRoutes.includes(router.pathname)) {
            return (
                <AdminRoute>
                    <Component {...pageProps} />
                </AdminRoute>
            );
        } else if (staffRoutes.includes(router.pathname)) {
            return (
                <StaffRoute>
                    <Component {...pageProps} />
                </StaffRoute>
            );
        } else {
            return <div>Access Denied</div>;
        }
    };

    if (loading) {
        return null; // Optionally, return a loading spinner or similar
    }

    return (
        <>
            {getProtectedRoute()}
        </>
    );
}

export default MyApp;
