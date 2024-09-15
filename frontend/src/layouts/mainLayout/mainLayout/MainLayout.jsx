import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../header/Header'
import ReturnToTopButton from '../returnToTopButton/ReturnToTopButton'
import Footer from '../footer/Footer'
import NavLinks from '../navLink/NavLinks'

export default function MainLayout() {

    const { pathname } = useLocation()

    return (
        <>
            <Header />
            <main>
                {
                    !["/", "/home"].includes(pathname) && <NavLinks />
                }
                <Outlet />
            </main>
            <ReturnToTopButton />
            <Footer />
        </>
    )
}