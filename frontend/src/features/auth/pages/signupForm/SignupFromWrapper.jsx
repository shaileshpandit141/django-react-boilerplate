import React from "react";
import './SignupForm.scss'
import { Helmet } from "react-helmet-async";

export default function SignupFromWrapper({ children }) {
  return (
    <div className='inner-grid-2-2 signup-from-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      {children}
    </div>
  )
}
