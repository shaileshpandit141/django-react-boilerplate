import React from 'react'
import { useLocation } from "react-router-dom"
import "./Footer.scss"

export default function Footer() {

    // Get the current path.
    const { pathname } = useLocation()

    const notDisplayRoutes = ![
        "/login",
        "/resend-verification-key",
        "/signup",
        "/resend-verification-key",
    ].includes(pathname)

    return (
        <>
            {
                notDisplayRoutes && (
                    <footer className='grid-12 footer'>
                        <div className="grid-2-2">
                            <h3>Footer</h3>
                        </div>
                    </footer>
                )
            }
        </>
    )
}
