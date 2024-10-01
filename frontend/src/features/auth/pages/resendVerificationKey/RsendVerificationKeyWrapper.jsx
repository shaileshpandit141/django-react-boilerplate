import React from "react"
import './ResendVerificationKey.scss'
import { Helmet } from "react-helmet-async"

export default function ResendVerificationKeyWrapper({ children }) {
  return (
    <div className='inner-grid-2-2 resend-verifucation-key-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>verification your account if not verified</title>
      </Helmet>
      {children}
    </div>
  )
}
