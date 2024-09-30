import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import { isHideRoutes } from "utils/isHideRoutes"
import "./ReturnToTopButton.scss"
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'

export default function ReturnToTopButton() {

  const { pathname } = useLocation()
  const [isPageScrollable, setIsPageScrollable] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight)
  const [isScrollToTopButtonVisible, setIsScrollToTopButtonVisible] = useState(true)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  useEffect(() => {

    // Update the viewport height
    const handleResize = () => {
      setViewportHeight(window.innerHeight)
    }

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop

      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setIsScrollToTopButtonVisible(false)
      } else {
        // Scrolling up
        setIsScrollToTopButtonVisible(true)
      }

      // For Mobile or negative scrolling
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop)

      setIsPageScrollable(() => document.body.scrollHeight > viewportHeight / 2)
    }


    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }

  }, [viewportHeight, lastScrollTop])

  function handleReturnToTopButtonClick() {
    const anchor = document.createElement("a")
    anchor.setAttribute("href", "#")
    anchor.click()
  }

  let scrollTopButtonActionsClass = (
    isScrollToTopButtonVisible && (lastScrollTop > viewportHeight)
      ? 'visible'
      : 'hidden'
  )

  if (isPageScrollable && !isHideRoutes(pathname)) {
    return (
      <div
        className={`scroll-to-top-button-wrapper ${scrollTopButtonActionsClass}`}
      >
        <button onClick={handleReturnToTopButtonClick} className='button-as-icon'>
          <span className='icon'>
            <LazyMaterialIcon iconName={icons.arrowUp} />
          </span>
        </button>
      </div>
    )
  } else {
    return null
  }
}
