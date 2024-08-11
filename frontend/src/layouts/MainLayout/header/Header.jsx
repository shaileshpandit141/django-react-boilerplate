// Default Imports.
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../../features/auth/authSelectors';

// Named Imports.
import './header.scss';
import ThemeButton from '../../../components/specific/themeButton/ThemeButton';
import Loout from '../../../features/auth/components/logout/Logout';

export default function Header() {

    const { isAuthenticated } = useSelector(selectAuthState)

    return (
        <header className='header'>
            <div className='header-wrapper'>
                <div className="left-container">Left</div>
                <div className="center-container">Center</div>
                <div className="right-container">
                    {
                        isAuthenticated && (
                            <div className='button-wrapper'>
                                <Loout />
                            </div>
                        )
                    }

                    {
                        !isAuthenticated && (
                            <div className='link-wrapper'>
                                <NavLink to='/login'>login</NavLink>
                            </div>
                        )
                    }
                    <ThemeButton />
                </div>
            </div>
        </header>
    )
}
