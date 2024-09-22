import React, { useState, useEffect, useRef } from "react"
import "./Profile.scss"
import { Link } from "react-router-dom"
import { useAuthSelectors } from "../../../features/auth"
import { useUserSelectors } from '../../../features/user'
import { LogoutButton } from "../../../features/auth"
import { LazyMaterialIcon, icons } from "../../../assets/lazyMaterialIcon/LazyMaterialIcon"

export default function Profile() {

    const { isAuthenticated } = useAuthSelectors()
    const { data } = useUserSelectors()

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
            icon: <LazyMaterialIcon iconName={icons.AccountCircle} />,
        },
        {
            name: "settings",
            link: "#",
            icon: <LazyMaterialIcon iconName={icons.Settings} />,
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
                {link.icon}
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
                    <LazyMaterialIcon iconName={icons.AccountCircle} />
                </span>
            </button>
            <div
                ref={popoverRef}
                className={`popover-wrapper ${isPopoverVisible ? "active" : ""}`}
            >
                <div className="inner-wrapper">
                    <div className="user-info">
                        <div className="figure-container">
                            {/* Profile picture */}
                        </div>
                        <div className="info-label">
                            <h3 className="username">{data?.username}</h3>
                            <p className="email">{data?.email}</p>
                        </div>
                    </div>
                    <div className="line"></div>
                    {popoverElements}
                    <LogoutButton onClick={togglePopover} />
                </div>
            </div>
        </>
    )
}
