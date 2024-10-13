import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSigninSelectors } from 'features/auth'

export default function PrivateRoute() {
  const { isAuthenticated } = useSigninSelectors()

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />
}
