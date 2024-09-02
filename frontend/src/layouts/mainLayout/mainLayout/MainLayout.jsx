import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import ReturnToTopButton from '../returnToTopButton/ReturnToTopButton'
import Footer from '../footer/Footer'

export default function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <ReturnToTopButton />
            <Footer />
        </>
    )
}