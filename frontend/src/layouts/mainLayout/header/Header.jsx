// Named Imports.
import React, { useState, useEffect } from 'react';
import Profile from '../profile/Profile';

// Default Imports.
import './header.scss';
import ThemeButton from '../../../components/specific/themeButton/ThemeButton';


export default function Header() {

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
                    <input type="search" placeholder='search...' className='search-input'/>
                </div>
                <div className="right-container">
                    {/* Right items goes here */}
                    <ThemeButton />
                    <Profile />
                </div>
            </div>
        </header>
    )
}
