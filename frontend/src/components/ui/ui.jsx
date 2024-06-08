import React from 'react'
import './ui.css'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'

function Home() {
    return (
        <main className='grid-12'>
            {/* Header Section. */}
            <section className="grid-12 grid-column-1-1 header-container">
                <Header />
            </section>

            {/* Main Content Section.  */}
            <section className='grid-element-center grid-column-1-1'>
                <Outlet />
            </section>

            {/* Footer Section. */}
            <section className="grid-12 grid-column-1-1 footer-container">
                <Footer />
            </section>
        </main>
    )
}

export { Home }