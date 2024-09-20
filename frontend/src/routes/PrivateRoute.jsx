// Named Imports.
import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { isTokenExpired } from '../utils/isTokenExpired'
import { logout } from '../features/auth'
import { useAuthSelectors } from '../features/auth'
import ErrorBoundary from '../errors/ErrorBoundary/ErrorBoundary'

export default function PrivateRoute() {
    const dispatch = useDispatch()

    const { refreshToken, isAuthenticated } = useAuthSelectors()

    useEffect(() => {
        if (isTokenExpired(refreshToken)) {
            dispatch(logout())
        }
    }, [dispatch, refreshToken])

    return isAuthenticated ? (
        // <ErrorBoundary>
        //     <Outlet />
        // </ErrorBoundary>
        <Outlet />
    ) : <Navigate to="/login" />
}
