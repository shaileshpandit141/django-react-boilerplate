import React from "react"
import './ResendVerificationKey.scss'
import { useMatadataContext } from 'context/matadataContext'
import { Helmet } from "react-helmet-async"

export default function ResendVerificationKeyWrapper({ children }) {
  // Select the metadata context for setting the document metadata
  const { domain, title } = useMatadataContext()
  
  return (
    <div className='inner-grid-2-2 resend-verifucation-key-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>Resend Verification Key | {title}</title>
        <meta name="description" content="Resend your account verification key to your registered email. Complete your registration by verifying your email address." />
        <meta name="keywords" content="resend verification key, email verification, account verification, resend verification" />
        <meta property="og:title" content={`Resend Verification Key | ${title}`} />
        <meta property="og:description" content="Didn't receive the verification email? Request to resend the verification key and complete your account setup." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://${domain}/resend-verification`} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {children}
    </div>
  )
}
