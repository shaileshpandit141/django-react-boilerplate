import React from 'react'
import './Layout.css'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'

export default function MainLayout() {
    return (
        <main className='grid--wrapper'>
            {/* Header Section. */}
            <section className="grid--wrapper grid--element--full header--container">
                <Header />
            </section>

            {/* Main Content Section.  */}
            <section className='grid--element--center'>
                <Outlet />
            </section>

            {/* Footer Section. */}
            <section className="grid--wrapper grid--element--full footer--container">
                <Footer />
            </section>
        </main>
    )
}
