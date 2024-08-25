// Named Imports.
import React, { useEffect } from 'react'
import { useLocalStorage } from '../../../hooks/useLocalStorage';

// Default Imports.
import './themeButton.scss'
import lightModeIcon from '../../../assets/icons/light_mode_icon.svg';
import darkModeIcon from '../../../assets/icons/dark_mode_icon.svg';

export default function ThemeButton() {

    // Define a theme state.
    const [theme, setTheme] = useLocalStorage('theme', 'light');

    // Update the theme during user is refresh page.
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // update the theme state during user is cleck the theme switch button.
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className="theme-button-wrapper">
            <button onClick={toggleTheme} className='theme-button'>
                {
                    theme === 'light' && (
                        <img className='dark-icon' src={darkModeIcon} alt="dark-icon" />
                    )
                }
                {
                    theme !== 'light' && (
                        <img className='light-icon' src={lightModeIcon} alt="light-icon" />
                    )
                }
            </button>
        </div>
    )
}