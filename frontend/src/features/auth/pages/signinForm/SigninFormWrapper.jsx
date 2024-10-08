import React from 'react'
import './SigninForm.scss'
import { Helmet } from 'react-helmet-async'

export default function SigninFormWrapper({ children }) {
  return (
    <div className='inner-grid-2-2 signin-from-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>Sign In | YourApp</title>
        <meta name="description" content="Sign in to your account to access exclusive features and manage your profile. Enter your username/email and password to log in securely." />
        <meta name="keywords" content="sign in, login, user login, account access, secure login" />
        <meta property="og:title" content="Sign In | YourApp" />
        <meta property="og:description" content="Log in to your account to access all your personalized settings and features. Secure and easy sign-in process." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourapp.com/sign-in" />
        <meta property="og:image" content="https://yourapp.com/static/sign-in.jpg" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {children}
    </div>
  )
}
