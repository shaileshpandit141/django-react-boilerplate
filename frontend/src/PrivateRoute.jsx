import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { store } from './app/store';
import { useDispatch, useSelector } from 'react-redux';
import { isTokenExpired } from './utils/isTokenExpired';
import { logout } from './features/auth/authSlice';

export default function PrivateRoute() {
    const dispatch = useDispatch();
    
    const refreshToken = store.getState().auth.refreshToken;

    React.useEffect(() => {
        if (isTokenExpired(refreshToken)) {
            dispatch(logout());
        }
    }, [dispatch]);
    
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

