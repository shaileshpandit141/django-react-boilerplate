import React from 'react'
import './header.scss'
import { NavLink } from 'react-router-dom'
import { logout } from '../../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'


export default function Header() {

    const dispatch = useDispatch()
    const accessToken = useSelector((state) => state.auth.access)

    return (
        <header className='header'>
            <div className='header-wrapper'>
                <div className="left-container">Left</div>
                <div className="center-container">Center</div>
                <div className="right-container">
                    {
                        accessToken
                            ? <a href='/login' onClick={() => dispatch(logout())}>Logout</a>
                            : <NavLink to='/login'>login</NavLink>
                    }
                    <button className="theme-button">
                        &
                    </button>
                </div>
            </div>
        </header>
    )
}
