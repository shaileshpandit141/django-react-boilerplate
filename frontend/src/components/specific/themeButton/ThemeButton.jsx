import React, { useState, useEffect } from 'react'
import './themeButton.scss'
import lightModeIcon from '../../../assets/icons/light_mode_icon.svg';
import darkModeIcon from '../../../assets/icons/dark_mode_icon.svg';

export default function ThemeButton() {
    const [themeSate, setThemeState] = useState(true);

    function handleThemeChange(event) {
        const body = document.body;
        if (themeSate) {
            setThemeState(false);
            body.classList.remove("dark-theme");
            body.classList.add("dark-theme");
        } else {
            setThemeState(true);
            body.classList.remove("dark-theme");
        }
    }

    return (
        <div className="theme-button-wrapper">
            <button onClick={handleThemeChange} className='theme-button'>
                <img className='light-icon' src={lightModeIcon} alt="light-icon" />
                <img className='dark-icon' src={darkModeIcon} alt="dark-icon" />
            </button>
        </div>
    )
}
