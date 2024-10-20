import React, { useState, useEffect } from 'react'
import './header.scss'
import Profile from 'components/specific/profile/Profile'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'
import ThemeButton from 'components/specific/themeButton/ThemeButton'
import { Link } from 'react-router-dom'
import { useSigninSelector } from 'features/auth'

export default function Header() {

  const { isAuthenticated } = useSigninSelector()
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setIsHeaderVisible(false)
      } else {
        // Scrolling up
        setIsHeaderVisible(true)
      }

      // For Mobile or negative scrolling
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollTop])

  return (
    <header className={`header ${isHeaderVisible ? 'visible' : 'hidden'}`}>
      <div className='header-wrapper'>
        <div className="left-container">
          {/* Left items goes here */}
          <button className="button-as-icon">
            <span className="icon">
              <LazyMaterialIcon iconName={icons.circleAppIcon} />
            </span>
          </button>
        </div>
        <div className="center-container">
          {/* Center items goes here */}
        </div>
        <div className="right-container">
          {/* Right items goes here */}
          {
            isAuthenticated && (
              <Link to='search-service' className='link search-service-link'>
                <span className="icon">
                  <LazyMaterialIcon iconName={icons.search} />
                </span>
                <span className='label'>search</span>
              </Link>
            )
          }
          <ThemeButton />
          <Profile />
        </div>
      </div>
    </header>
  )
}
