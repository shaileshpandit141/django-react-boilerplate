// Named Imports.
import React, {useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isTokenExpired } from '../utils/isTokenExpired';
import { logout } from '../features/auth/authSlice';

// Default Import.
import useAuthSelector from '../features/auth/useAuthSelectors';

export default function PrivateRoute() {
    const dispatch = useDispatch();

    const { refreshToken, isAuthenticated } = useAuthSelector()

    useEffect(() => {
        if (isTokenExpired(refreshToken)) {
            dispatch(logout());
        }
    }, [dispatch, refreshToken]);
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

