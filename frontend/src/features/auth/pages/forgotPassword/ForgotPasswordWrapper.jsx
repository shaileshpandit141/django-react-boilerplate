import React from 'react'
import './ForgotPassword.scss'
import { Helmet } from 'react-helmet-async'

export default function ForgotPasswordWrapper({ children }) {
  return (
    <div className='inner-grid-2-2 forgot-password-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>forgot password</title>
      </Helmet>
      {children}
    </div>
  )
}
