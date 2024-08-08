import React, { useState, useEffect } from 'react'
import './header.scss'
import { NavLink } from 'react-router-dom'
import { logout } from '../../../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'


export default function Header() {

    const dispatch = useDispatch()
    const accessToken = useSelector((state) => state.auth.access)
    const [lastScroll, setLastScroll] = useState(0)
    const [currentScroll, setCurrentScroll] = useState(0)

    useEffect(() => {
        let body = document.body;

        window.addEventListener("scroll", () => {
            setCurrentScroll(window.scrollY);
            if (currentScroll <= 0) {
                body.classList.remove("scroll-up");
                return;
            }

            if (currentScroll > lastScroll &&
                !body.classList.contains("scroll-down")
            ) {
                body.classList.remove("scroll-up");
                body.classList.add("scroll-down");
            } else if (
                currentScroll < lastScroll &&
                body.classList.contains("scroll-down")
            ) {
                body.classList.remove("scroll-down");
                body.classList.add("scroll-up");
            }
            setLastScroll(currentScroll);
        });

    })

    return (
        <header className='header'>
            <div className='header-wrapper'>
                <div className="left-container">Left</div>
                <div className="center-container">Center</div>
                <div className="right-container">
                    {
                        accessToken
                            ? (
                                <div className='link-wrapper'>
                                    <a href='/login' onClick={() => dispatch(logout())}>Logout</a>
                                </div>
                            )
                            : (
                                <div className='link-wrapper'>
                                    <NavLink to='/login'>login</NavLink>
                                </div>
                            )
                    }
                    <button className="theme-button">
                        &
                    </button>
                </div>
            </div>
        </header>
    )
}
