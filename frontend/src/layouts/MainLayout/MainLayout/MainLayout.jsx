import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import ReturnToTopButton from '../ReturnToTopButton/ReturnToTopButton'

export default function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <ReturnToTopButton />
        </>
    )
}