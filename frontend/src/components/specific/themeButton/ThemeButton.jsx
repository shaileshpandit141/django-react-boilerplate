// Named Imports.
import React, { useEffect } from 'react'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'

export default function ThemeButton() {

  // Define a theme state.
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  // Update the theme during user is refresh page.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // update the theme state during user is cleck the theme switch button.
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <button
      className='button-as-icon'
      onClick={toggleTheme}
    >
      <span className='icon'>
        {
          theme === "light" && (
            <LazyMaterialIcon iconName={icons.darkModeIcon} />
          )
        }
        {
          theme !== "light" && (
            <LazyMaterialIcon iconName={icons.lightModeIcon} />
          )
        }
      </span>
    </button>
  )
}
