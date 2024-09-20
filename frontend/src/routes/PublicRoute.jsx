import React from 'react'
import { Outlet } from 'react-router-dom'
import ErrorBoundary from '../errors/ErrorBoundary/ErrorBoundary'

export default function PublicRoute() {
    return (
        // <ErrorBoundary>
        //     <Outlet />
        // </ErrorBoundary>
        <Outlet />
    )
}
