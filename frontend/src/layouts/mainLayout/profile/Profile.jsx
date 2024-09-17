import React, { useState, useEffect, useRef } from "react"
import "./Profile.scss"
import { Link } from "react-router-dom"
import { useAuthSelectors } from "../../../features/auth"
import { useUserSelectors } from '../../../features/user'
import { LogoutButton } from "../../../features/auth"

export default function Profile() {

    const { isAuthenticated } = useAuthSelectors()
    const { response } = useUserSelectors()

    const [isPopoverVisible, setPopoverVisible] = useState(false)
    const profileButtonRef = useRef(null)
    const popoverRef = useRef(null)

    const togglePopover = () => {
        setPopoverVisible((prev) => !prev)
    }

    // Hnadle  Outside Click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                popoverRef.current &&
                !profileButtonRef.current.contains(event.target) &&
                !popoverRef.current.contains(event.target)
            ) {
                setPopoverVisible(false)
            }
        }

        if (isPopoverVisible) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isPopoverVisible])

    const links = [
        {
            name: "profile",
            link: "#",
            icon: "account_circle",
        },
        {
            name: "settings",
            link: "#",
            icon: "settings",
        },
    ]

    const popoverElements = links.map((link, index) => (
        <Link
            to={link.link}
            className="link"
            key={index}
            onClick={togglePopover}
        >
            <span className="icon">
                <span className="material-symbols-outlined fill">{link.icon}</span>
            </span>
            <span className="label">{link.name}</span>
        </Link>
    ))

    if (!isAuthenticated) {
        return null
    }

    return (
        <>
            <button
                ref={profileButtonRef}
                className="button-as-icon"
                onClick={togglePopover}
            >
                <span className="icon">
                    <span className="material-symbols-outlined fill">account_circle</span>
                </span>
            </button>
            <div
                ref={popoverRef}
                className={`popover-wrapper ${isPopoverVisible ? "active" : ""}`}
            >
                <div className="inner-wrapper">
                    <button className="button">
                        <span className="icon">
                            <span className="material-symbols-outlined fill">
                                person
                            </span>
                        </span>
                        <span className="label">
                            {response?.username}
                        </span>
                    </button>
                    {popoverElements}
                    <LogoutButton onClick={togglePopover} />
                </div>
            </div>
        </>
    )
}
