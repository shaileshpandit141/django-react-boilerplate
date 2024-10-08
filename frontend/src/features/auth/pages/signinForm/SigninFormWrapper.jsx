import React from 'react'
import './SigninForm.scss'
import { useMatadataContext } from 'context/matadataContext'
import { Helmet } from 'react-helmet-async'

export default function SigninFormWrapper({ children }) {
  // Select the metadata context for setting the document metadata
  const { domain, title } = useMatadataContext()

  return (
    <div className='inner-grid-2-2 signin-from-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>Sign In | {title}</title>
        <meta name="description" content="Sign in to your account to access exclusive features and manage your profile. Enter your username/email and password to log in securely." />
        <meta name="keywords" content="sign in, login, user login, account access, secure login" />
        <meta property="og:title" content={`Sign In | ${title}`} />
        <meta property="og:description" content="Log in to your account to access all your personalized settings and features. Secure and easy sign-in process." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://${domain}/sign-in`} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {children}
    </div>
  )
}
