import React, { useEffect, useMemo } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'

export default function ThemeButton() {
  // Destructure icons to improve readability
  const { darkModeIcon, lightModeIcon } = icons

  // Define a theme state.
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  // Update the theme when the page is refreshed, only if it differs from the current one.
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    if (currentTheme !== theme) {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  // Memoize the icon to avoid unnecessary re-renders.
  const icon = useMemo(() => (
    theme === 'light' ? darkModeIcon : lightModeIcon
  ), [theme, darkModeIcon, lightModeIcon])

  // Toggle between light and dark theme.
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <button className='button-as-icon' onClick={toggleTheme}>
      <span className='icon'>
        <LazyMaterialIcon iconName={icon} />
      </span>
    </button>
  )
}
