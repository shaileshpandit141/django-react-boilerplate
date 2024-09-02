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
                    {/* For Test */}
                    <div className="button-as-link-wrapper">
                        <button>left</button>
                    </div>
                </div>
                <div className="center-container">
                    {/* For Test */}
                    <div className="button-as-link-wrapper">
                        <button>center</button>
                    </div>
                </div>
                <div className="right-container">
                    {
                        isAuthenticated && (
                            <div className='button-wrapper'>
                                <LogoutButton />
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
