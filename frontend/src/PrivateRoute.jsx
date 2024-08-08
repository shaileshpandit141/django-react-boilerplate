import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isTokenExpired } from './utils/isTokenExpired';
import { useDispatch } from 'react-redux';
import { logout } from './features/auth/authSlice';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch()
    const location = useLocation();
    const { access, refresh } = useSelector(state => state.auth);

    // Check if the access token is expired
    const accessTokenExpired = isTokenExpired(access);
    // Check if the refresh token is expired
    const refreshTokenExpired = isTokenExpired(refresh);

    if (accessTokenExpired || !access) {
        // If access token is expired, check if refresh token is expired
        if (refreshTokenExpired || !refresh) {
            // If refresh token is expired or not available, redirect to login
            dispatch(logout())
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    }

    return children;
};

export default ProtectedRoute;
