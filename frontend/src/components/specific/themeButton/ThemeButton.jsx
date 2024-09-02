// Named Imports.
import React, { useEffect } from 'react'
import { useLocalStorage } from '../../../hooks/useLocalStorage';

// Default Imports.
import './themeButton.scss'

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
            <button
                className='button-1-1'
                onClick={toggleTheme}
            >
                <span className='icon'>
                    {
                        theme === "light" && (
                            <span className="material-symbols-outlined">
                                dark_mode
                            </span>
                        )
                    }
                    {
                        theme !== "light" && (
                            <span className="material-symbols-outlined">
                                light_mode
                            </span>
                        )
                    }
                </span>
            </button>
        </div>
    )
}
