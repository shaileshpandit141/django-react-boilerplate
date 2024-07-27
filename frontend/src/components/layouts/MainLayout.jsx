import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../specific/header/Header'

export default function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
