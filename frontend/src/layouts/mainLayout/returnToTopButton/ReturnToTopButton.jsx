import React, { useEffect, useState } from 'react' 
import { useLocation } from "react-router-dom" 
import "./ReturnToTopButton.scss" 

export default function ReturnToTopButton() {

    const { pathname } = useLocation()
    const [isPageScrollable, setIsPageScrollable] = useState(false) 
    const [viewportHeight, setViewportHeight] = useState(window.innerHeight) 
    const [isScrollToTopButtonVisible, setIsScrollToTopButtonVisible] = useState(true) 
    const [lastScrollTop, setLastScrollTop] = useState(0) 

    useEffect(() => {

        // Handler to update the viewport height
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
            setIsPageScrollable(() => document.body.scrollHeight > viewportHeight)
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

    const unVisibleRoutes = !["/login"].includes(pathname)

    return (
        <>
            {
                isPageScrollable && unVisibleRoutes && (
                    <div
                        className={`
                            scroll-to-top-button-wrapper
                            ${isScrollToTopButtonVisible && (lastScrollTop > viewportHeight)
                                ?
                                'visible' : 'hidden'
                            }
                            `}
                    >
                        <button onClick={handleReturnToTopButtonClick} className='button-1-1'>
                            <span className='icon'>
                                <span className="material-symbols-outlined">
                                    arrow_upward
                                </span>
                            </span>
                        </button>
                    </div>
                )
            }
        </>
    )
}
