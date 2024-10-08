import React from "react";
import "./ForgotPassword.scss"
import { useMatadataContext } from 'context/matadataContext'
import { Helmet } from 'react-helmet-async'

export default function PasswordResetConfirmWrapper({ children }) {
  // Select the metadata context for setting the document metadata
  const { domain, title } = useMatadataContext()
  
  return (
    <div className='inner-grid-2-2 forgot-password-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>Reset Password Confirm | {title}</title>
        <meta name="description" content="Confirm your password reset request. Enter a new password to complete the process and regain access to your account." />
        <meta name="keywords" content="password reset, confirm password, new password, reset password confirmation" />
        <meta property="og:title" content={`Password Reset Confirmation | ${title}`} />
        <meta property="og:description" content="Confirm your password reset and set a new password to regain access to your account." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://${domain}/reset-password-confirm`} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {children}
    </div>
  )
}
