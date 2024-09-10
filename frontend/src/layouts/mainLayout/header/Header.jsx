// Named Imports.
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthSelectors } from '../../../features/auth';
import { LogoutButton } from '../../../features/auth';

// Default Imports.
import './header.scss';
import ThemeButton from '../../../components/specific/themeButton/ThemeButton';


export default function Header() {

    const { isAuthenticated } = useAuthSelectors();
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
                <div className="left-container">
                    {/* Left items goes here */}
                    <button className="button-as-icon">
                        <span className="icon">i</span>
                    </button>
                </div>
                <div className="center-container">
                    {/* Center items goes here */}
                </div>
                <div className="right-container">
                    {/* Right items goes here */}
                    {
                        isAuthenticated && (
                            <LogoutButton />
                        )
                    }

                    {
                        !isAuthenticated && (
                            <NavLink
                                className="link"
                                to='/login'
                            >
                                <span className='label'>login</span>
                            </NavLink>
                        )
                    }
                    <ThemeButton />
                </div>
            </div>
        </header>
    )
}
