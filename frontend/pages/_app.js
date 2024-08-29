// import React from "react";

// function MyApp({ Component, pageProps }) {
//     return <Component {...pageProps} />;
// }

// export default MyApp;

// import React from 'react';
// import { useRouter } from 'next/router';
// import ProtectedRoute from '../src/app/components/ProtectedRoute';

// const noAuthRequired = ['/', '/login'];

// function MyApp({ Component, pageProps }) {
//     const router = useRouter();

//     return (
//         <>
//             {noAuthRequired.includes(router.pathname) ? (
//                 <Component {...pageProps} />
//             ) : (
//                 <ProtectedRoute>
//                     <Component {...pageProps} />
//                 </ProtectedRoute>
//             )}
//         </>
//     );
// }

// export default MyApp;

import React from 'react';
import { useRouter } from 'next/router';
import StaffRoute from '../src/app/components/routeProtection/StaffRoute'; // Adjust the path as necessary
import UserRoute from '../src/app/components/routeProtection/UserRoute'; // Adjust the path as necessary
import AdminRoute from '../src/app/components/routeProtection/AdminRoute'; // Adjust the path as necessary
import '../src/app/components/routeProtection/popup.css'; // Import the popup styles

// routes that don't require authentication
const noAuthRequired = ['/', '/login', '/bbdc']; 
// routes that require instructor authentication
const userRoutes = ['/instructorHome', '/instructorProfile', '/instructorAvailability', '/instructorStudents']; // Define instructor-specific routes
// routes that require student authentication
const adminRoutes = ['/home', '/profile', '/theoryTest', '/booking', '/paymentBooking', '/balance', '/btt', '/ftt', '/auto', '/manual', '/bookingList', '/webscraping']; // Define student-specific routes
// routes that require student authentication
const staffRoutes = ['/home', '/profile', '/theoryTest', '/booking', '/paymentBooking', '/balance', '/btt', '/ftt', '/auto', '/manual', '/bookingList', '/webscraping']; // Define student-specific routes

function MyApp({ Component, pageProps }) {
    const router = useRouter();

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
            // If the route is not specified, you can either redirect to a 404 page or show an access denied message
            return <div>Access Denied</div>;
        }
    };

    return <>{getProtectedRoute()}</>;
}

export default MyApp;


// import React, { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import StudentRoute from '../src/app/components/routeProtection/StudentRoute'; // Adjust the path as necessary
// import InstructorRoute from '../src/app/components/routeProtection/InstructorRoute'; // Adjust the path as necessary
// import '../src/app/components/routeProtection/popup.css'; // Import the popup styles

// // Routes that don't require authentication
// const noAuthRequired = ['/', '/login'];
// // Routes that require instructor authentication
// const instructorRoutes = ['/instructorHome', '/instructorProfile', '/instructorAvailability', '/instructorStudents'];
// // Routes that require student authentication
// const studentRoutes = ['/home', '/profile', '/booking', '/paymentBooking', '/balance', '/btt', '/ftt', '/auto', '/manual', '/bookingList'];

// function MyApp({ Component, pageProps }) {
//   const router = useRouter();

//   useEffect(() => {
//     const handleRouteChange = () => {
//       window.location.reload();
//     };

//     router.events.on('routeChangeComplete', handleRouteChange);

//     // Cleanup the event listener on component unmount
//     return () => {
//       router.events.off('routeChangeComplete', handleRouteChange);
//     };
//   }, [router.events]);

//   const getProtectedRoute = () => {
//     if (noAuthRequired.includes(router.pathname)) {
//       return <Component {...pageProps} />;
//     } else if (instructorRoutes.includes(router.pathname)) {
//       return (
//         <InstructorRoute>
//           <Component {...pageProps} />
//         </InstructorRoute>
//       );
//     } else if (studentRoutes.includes(router.pathname)) {
//       return (
//         <StudentRoute>
//           <Component {...pageProps} />
//         </StudentRoute>
//       );
//     } else {
//       // If the route is not specified, you can either redirect to a 404 page or show an access denied message
//       return <div>Access Denied</div>;
//     }
//   };

//   return <>{getProtectedRoute()}</>;
// }

// export default MyApp;

