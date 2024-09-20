import React from 'react'
import { NavLink } from 'react-router-dom'
import './NotFound.scss'

export default function NotFound() {
    return (
        <section className='inner-grid-2-2 not-found-page'>
            <h1 className='text-404'>Page Not Found 404</h1>
            <NavLink to='..' className="link">
                <span className='label'>
                    Return back to
                </span>
            </NavLink>
        </section>
    )
}
