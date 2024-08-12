// Named Imports.
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../../features/auth/authSelectors';

// Default Imports.
import './header.scss';
import ThemeButton from '../../../components/specific/themeButton/ThemeButton';
import Loout from '../../../features/auth/components/logout/Logout';

export default function Header() {

    const { isAuthenticated } = useSelector(selectAuthState)
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScrollTop > lastScrollTop) {
                // Scrolling down
                setIsHeaderVisible(false);
            } else {
                // Scrolling up
                setIsHeaderVisible(true);
            }

            // For Mobile or negative scrolling
            setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    return (
        <header className={`header ${isHeaderVisible ? 'visible' : 'hidden'}`}>
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
