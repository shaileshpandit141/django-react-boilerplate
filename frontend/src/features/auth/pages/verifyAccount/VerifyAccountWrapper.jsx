import React from "react";
import './VerifyAccount.scss'
import { Helmet } from "react-helmet-async";

export default function VerifyAccountWrapper({ children }) {
  return (
    <div className='inner-grid-2-2 verify-account-from-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>verify your account</title>
      </Helmet>
      {children}
    </div>
  )
}
