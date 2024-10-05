import React from 'react'
import './ForgotPassword.scss'
import { Helmet } from 'react-helmet-async'

export default function ForgotPasswordWrapper({ children }) {
  return (
    <div className='inner-grid-2-2 forgot-password-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>Forgot Password | YourApp</title>
        <meta name="description" content="Reset your password by providing your registered email. If you've forgotten your password, follow the steps to recover it." />
        <meta name="keywords" content="forgot password, reset password, account recovery, password recovery" />
        <meta property="og:title" content="Forgot Password | YourApp" />
        <meta property="og:description" content="Enter your email to recover your account password. Follow the steps to securely reset your password." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourapp.com/forgot-password" />
        <meta property="og:image" content="https://yourapp.com/static/forgot-password.jpg" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {children}
    </div>
  )
}
