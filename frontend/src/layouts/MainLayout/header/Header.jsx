import React from 'react'
import './header.scss'
import { NavLink, redirect } from 'react-router-dom'
import Loout from '../../../features/auth/components/logout/Logout'
import { useDispatch, useSelector } from 'react-redux'


export default function Header() {

    const dispatch = useDispatch()
    const accessToken = useSelector((state) => state.auth.accessToken)


    return (
        <header className='header'>
            <div className='header-wrapper'>
                <div className="left-container">Left</div>
                <div className="center-container">Center</div>
                <div className="right-container">
                    {
                        accessToken
                            ? (
                                <div className='button-wrapper'>
                                   <Loout />
                                </div>
                            )
                            : (
                                <div className='link-wrapper'>
                                    <NavLink to='/login'>login</NavLink>
                                </div>
                            )
                    }
                    <button className="theme-button">
                        &
                    </button>
                </div>
            </div>
        </header>
    )
}
