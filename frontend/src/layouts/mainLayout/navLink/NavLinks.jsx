import React from 'react'
import './NavLinks.scss'
import { Link } from 'react-router-dom'

export default function NavLinks() {
    return (
        <nav className="inner-fit-grid-2-2 nav-links">
            <Link
                to=".."
                className='link'
            >
                <span className='icon'>
                    <span className="material-symbols-outlined">
                        arrow_back_ios
                    </span>
                </span>
                <span className="label">
                    Return
                </span>
            </Link>
        </nav>
    )
}
