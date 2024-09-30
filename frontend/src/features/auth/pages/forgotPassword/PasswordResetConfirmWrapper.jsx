import React from "react";
import "./ForgotPassword.scss"
import { Helmet } from 'react-helmet-async'

export default function PasswordResetConfirmWrapper({ children }) {
  return (
    <div className='inner-grid-2-2 forgot-password-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>Password Reset Confirm | Enter new password</title>
      </Helmet>
      {children}
    </div>
  )
}
