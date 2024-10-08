import React from 'react'
import { NavLink } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './NotFound.scss'
import notFountImg from 'assets/icons/not_found.svg'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'

export default function NotFound() {
  return (
    <section className='inner-grid-2-2 not-found-page'>
      {/* Setting the meta data for not found page */}
      <Helmet>
        <title>Oops! Page Not Found - Let's Get You Back on Track</title>
        <meta name="description" content="404 Error - The page you're looking for doesn't exist or has been moved. Don't worry, we'll help you find your way back!" />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="404: Oops, This Page Is Lost in Space!" />
        <meta property="og:description" content="It seems like the page you're looking for has drifted off course. No worries, here are some links to get you back on track." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="not-found-page-grid">
        <div className='left-grid-container'>
          <figure className="figure-404-container">
            <img src={notFountImg} alt="not-fount-img" />
          </figure>
        </div>
        <div className="right-grid-container">
          <h1 className='title-text'>Oops! Page Not Found - Let's Get You Back on Track</h1>
          <p className='support-text'>
            It seems like the page you’re looking for has drifted off course. No worries, here are some links to get you back on track or explore new horizons.
          </p>
          <NavLink to='..' className="link">
            <span className='icon'>
              <LazyMaterialIcon iconName={icons.arrowBack} />
            </span>
            <span className='label'>
              Return back to
            </span>
          </NavLink>
        </div>
      </div>
    </section>
  )
}
