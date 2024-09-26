import React, { useState, useEffect, useRef } from "react"
import "./Profile.scss"
import { Link } from "react-router-dom"
import { useSigninSelectors } from "../../../features/auth"
import { useUserSelectors } from '../../../features/user'
import { LogoutButton } from "../../../features/auth"
import { LazyMaterialIcon, icons } from "../../../assets/lazyMaterialIcon/LazyMaterialIcon"
import { usePopover } from '../../../hooks/usePopover'

export default function Profile() {

  const { isAuthenticated } = useSigninSelectors()
  const { data } = useUserSelectors()

  const profileButtonRef = useRef(null)
  const popoverRef = useRef(null)

  const { togglePopover } = usePopover(profileButtonRef, popoverRef)


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
          <LogoutButton onClick={togglePopover} />
        </div>
      </div>
    </>
  )
}
