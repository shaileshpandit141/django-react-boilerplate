// Named Imports.
import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { isTokenExpired } from '../utils/isTokenExpired'
import { signout } from '../features/auth'
import { useSigninSelectors } from '../features/auth'

export default function PrivateRoute() {
    const dispatch = useDispatch()

    const { refreshToken, isAuthenticated } = useSigninSelectors()

    useEffect(() => {
        if (isTokenExpired(refreshToken)) {
            dispatch(signout())
        }
    }, [dispatch, refreshToken])

    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />
}
