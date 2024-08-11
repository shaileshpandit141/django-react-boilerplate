// Default Imports.
import React, {useEffect} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { store } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { isTokenExpired } from '../utils/isTokenExpired';
import { logout } from '../features/auth/authSlice';
import { selectAuthState } from '../features/auth/authSelectors'

export default function PrivateRoute() {
    const dispatch = useDispatch();

    // const refreshToken = store.getState().auth.refreshToken;
    const {refreshToken, isAuthenticated} = useSelector(selectAuthState)

    useEffect(() => {
        if (isTokenExpired(refreshToken)) {
            dispatch(logout());
        }
    }, [dispatch, refreshToken]);

    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

