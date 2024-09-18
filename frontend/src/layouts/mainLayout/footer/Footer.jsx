import React from 'react'
import { useLocation } from "react-router-dom"
import { isHideRoutes } from "../../../utils/isHideRoutes"
import "./Footer.scss"

export default function Footer() {

    // Get the current path.
    const { pathname } = useLocation()
    
    return (
        <>
            {
                !isHideRoutes(pathname) && (
                    <footer className='grid-12 footer'>
                        <div className="inner-fit-grid-2-2">
                            <h3>Footer</h3>
                        </div>
                    </footer>
                )
            }
        </>
    )
}
