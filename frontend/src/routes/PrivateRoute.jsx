import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSigninSelector } from 'features/auth'

export default function PrivateRoute() {
  const { isAuthenticated } = useSigninSelector()

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />
}
