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
import StaffRoute from '../src/app/components/routeProtection/StaffRoute';
import UserRoute from '../src/app/components/routeProtection/UserRoute';
import AdminRoute from '../src/app/components/routeProtection/AdminRoute';
import '../src/app/components/routeProtection/popup.css';

// routes that don't require authentication
const noAuthRequired = ['/', '/login', '/user-home', '/admin-home', '/admin-create-event' ]; 
// routes that require user authentication
const userRoutes = [];
// routes that require admin authentication
const adminRoutes = [];
// routes that require staff authentication
const staffRoutes = [];

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
            return <div>Access Denied</div>;
        }
    };

    return <>{getProtectedRoute()}</>;
}
export default MyApp;