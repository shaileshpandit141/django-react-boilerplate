import React from 'react'
import './header.scss'
import { NavLink } from 'react-router-dom'
import { logout } from '../../../features/auth/authSlice'
import { useDispatch } from 'react-redux'


export default function Header() {

    const dispatch = useDispatch()

    return (
        <header className='header'>
            <div className='header-wrapper'>
                <h3>Header</h3>
                <NavLink to='/login'>Login</NavLink>
                <span>     </span>
                <a href='/login' onClick={() => dispatch(logout())}>Logout</a>
            </div>
        </header>
    )
}
