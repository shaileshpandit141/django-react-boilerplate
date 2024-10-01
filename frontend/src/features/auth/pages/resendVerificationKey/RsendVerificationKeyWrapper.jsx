import React from "react"
import './ResendVerificationKey.scss'
import { Helmet } from "react-helmet-async"

export default function ResendVerificationKeyWrapper({ children }) {
  return (
    <div className='inner-grid-2-2 resend-verifucation-key-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>Resend Verification Key</title>
      </Helmet>
      {children}
    </div>
  )
}
