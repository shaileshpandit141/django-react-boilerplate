import React from "react";
import "./ForgotPassword.scss"
import { Helmet } from 'react-helmet-async'

export default function PasswordResetConfirmWrapper({ children }) {
  return (
    <div className='inner-grid-2-2 forgot-password-page'>
      {/* Metadata settings */}
      <Helmet>
        <meta name="description" content="Confirm your password reset request. Enter a new password to complete the process and regain access to your account." />
        <meta name="keywords" content="password reset, confirm password, new password, reset password confirmation" />
        <meta property="og:title" content="Password Reset Confirmation | YourApp" />
        <meta property="og:description" content="Confirm your password reset and set a new password to regain access to your account." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourapp.com/reset-password-confirm" />
        <meta property="og:image" content="https://yourapp.com/static/reset-password-confirm.jpg" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {children}
    </div>
  )
}
