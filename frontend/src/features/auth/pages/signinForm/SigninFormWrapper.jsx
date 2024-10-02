import React from 'react'
import './SigninForm.scss'
import { Helmet } from 'react-helmet-async'

export default function SigninFormWrapper({ children }) {
  return (
    <div className='inner-grid-2-2 signin-from-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      {children}
    </div>
  )
}
