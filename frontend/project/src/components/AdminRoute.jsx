import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('access');

    // If there is no token or the role is NOT 'A', send them to login
    if (!token || role !== 'A') {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AdminRoute;