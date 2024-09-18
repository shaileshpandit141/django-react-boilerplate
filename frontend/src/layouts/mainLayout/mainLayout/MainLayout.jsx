import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import ReturnToTopButton from '../../../components/specific/returnToTopButton/ReturnToTopButton'
import Footer from '../footer/Footer'

export default function MainLayout() {

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <ReturnToTopButton />
            <Footer />
        </>
    )
}