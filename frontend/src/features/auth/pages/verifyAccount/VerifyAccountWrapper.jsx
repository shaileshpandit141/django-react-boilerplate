import React from "react";
import './VerifyAccount.scss'
import { useMatadataContext } from 'context/matadataContext'
import { Helmet } from "react-helmet-async";

export default function VerifyAccountWrapper({ children }) {
  // Select the metadata context for setting the document metadata
  const { domain, title } = useMatadataContext()
  
  return (
    <div className='inner-grid-2-2 verify-account-from-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>Verify Your Account | {title}</title>
        <meta name="description" content="Verify your email address to complete your registration and access all the features of YourApp. Check your email for the verification link." />
        <meta name="keywords" content="verify email, email verification, account verification, confirm email" />
        <meta property="og:title" content={`Verify Email | ${title}`} />
        <meta property="og:description" content="Complete your registration by verifying your email address. Follow the link sent to your email to confirm your account." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://${domain}/verify-email`} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {children}
    </div>
  )
}
