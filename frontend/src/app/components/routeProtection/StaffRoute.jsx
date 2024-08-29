"use client"
import React from 'react';
import ProtectedRoute from './ProtectedRoute'; // Adjust the path as necessary

const StaffRoute = ({ children }) => {
    return <ProtectedRoute allowedRoles={['Staff']}>{children}</ProtectedRoute>;
};

export default StaffRoute;

