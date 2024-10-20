import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import './Index.scss'
import { useSigninSelector } from 'features/auth'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'
import { useMatadataContext } from 'context/matadataContext'
import { Helmet } from 'react-helmet-async'

export default function Index() {
  // Select the metadata context for setting the document metadata
  const { domain, title } = useMatadataContext()

  // Select the auth readux context.
  const { isAuthenticated } = useSigninSelector()

  // Check if user is Authenticated then redirect to another Route.
  if (isAuthenticated) {
    return <Navigate to='/home' />
  }

  return (
    <div className="inner-grid-2-2 index-page">
      {/* Metadata settings */}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Build robust UI with React, Django, and Django Rest Framework. Sign up or sign in to get started." />
        <meta name="keywords" content="React, Django, Django Rest Framework, UI boilerplate, sign in, sign up" />
        <meta property="og:title" content={`Forgot Password | ${title}`} />
        <meta property="og:url" content={`https://${domain}`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <figure className="logo-container">
        <img src="logo512.png" alt="logo512.png" />
      </figure>
      <h1>Welcome to building robust UI's</h1>
      <p>
        This boilerplate includes all the necessary setup for building robust UI's
        using React With Django and Django Rest Framework.
      </p>
      <div className="buttons-conatiner">
        <Link
          to="/signin"
          className='link'
        >
          <span className='icon'>
            <LazyMaterialIcon iconName={icons.signin} />
          </span>
          <span className='label'>
            sign in
          </span>
        </Link>
        <Link
          to="/signup"
          className='link'
        >
          <span className="icon">
            <LazyMaterialIcon iconName={icons.signup} />
          </span>
          <span className='label'>
            sign up
          </span>
        </Link>
      </div>
    </div>
  )
}
