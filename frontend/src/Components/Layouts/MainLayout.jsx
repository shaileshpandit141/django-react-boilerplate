import React from 'react'
import './MainLayout.css'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
    return (
        <>
            <Outlet />
        </>
    )
}
