import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ children }) {
    const access_token = useSelector((state) => state.auth.access);
    if (access_token) {
        return children
    } else {
        return <Navigate to="/login" />;
    }
};
