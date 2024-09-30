import React, { useRef, useEffect } from "react"
import "./Profile.scss"
import { Link } from "react-router-dom"
import { useSigninSelectors } from "features/auth"
import { useUserSelectors } from 'features/user'
import { LogoutButton } from "features/auth"
import { LazyMaterialIcon, icons } from "lazyUtils/LazyMaterialIcon"
import { useMenu } from 'hooks/useMenu'

export default function Profile() {

  const { isAuthenticated } = useSigninSelectors()
  const { data } = useUserSelectors()

  const profileButtonRef = useRef(null)
  const popoverRef = useRef(null)

  const { toggleMenu, setVisibleStyle, setHiddenStyle } = useMenu(profileButtonRef, popoverRef)

  useEffect(() => {
    setVisibleStyle((prevStyle) => {
      return {
        ...prevStyle,
        transform: "scale(1)"
      }
    })
    setHiddenStyle((prevStyle) => {
      return {
        ...prevStyle,
        transform: "scale(0.95)"
      }
    })
  }, [setHiddenStyle, setVisibleStyle])

  const links = [
    {
      name: "profile",
      link: "#",
      icon: <LazyMaterialIcon iconName={icons.accountCircle} />,
    },
    {
      name: "settings",
      link: "#",
      icon: <LazyMaterialIcon iconName={icons.settings} />,
    },
  ]

  const popoverElements = links.map((link, index) => (
    <Link
      to={link.link}
      className="link"
      key={index}
      onClick={toggleMenu}
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
        onClick={toggleMenu}
      >
        <span className="icon">
          <LazyMaterialIcon iconName={icons.accountCircle} />
        </span>
      </button>
      <div
        ref={popoverRef}
        className="popover-wrapper"
      // className={`popover-wrapper ${isPopoverVisible ? "active" : ""}`}
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
          <LogoutButton onClick={toggleMenu} />
        </div>
      </div>
    </>
  )
}
