import React from 'react'
import './ForgotPassword.scss'
import { useMatadataContext } from 'context/matadataContext'
import { Helmet } from 'react-helmet-async'

export default function ForgotPasswordWrapper({ children }) {
  // Select the metadata context for setting the document metadata
  const { domain, title } = useMatadataContext()
  
  return (
    <div className='inner-grid-2-2 forgot-password-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>Forgot Password | {title}</title>
        <meta name="description" content="Reset your password by providing your registered email. If you've forgotten your password, follow the steps to recover it." />
        <meta name="keywords" content="forgot password, reset password, account recovery, password recovery" />
        <meta property="og:title" content={`Forgot Password | ${title}`} />
        <meta property="og:description" content="Enter your email to recover your account password. Follow the steps to securely reset your password." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://${domain}/forgot-password`} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {children}
    </div>
  )
}
