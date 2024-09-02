import React from 'react'
import { useLocation } from "react-router-dom"
import "./Footer.scss"

export default function Footer() {

    // Get the current path.
    const { pathname } = useLocation()

    const notFooterDisplay = !["/login", "/signup"].includes(pathname)

    return (
        <>
            {
                notFooterDisplay && (
                    <footer className='grid-12'>
                        <div className="grid-2-2">
                            <h3>Footer</h3>
                        </div>
                    </footer>
                )
            }
        </>
    )
}
