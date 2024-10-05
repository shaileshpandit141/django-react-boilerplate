import React from "react";
import './SignupForm.scss'
import { Helmet } from "react-helmet-async";

export default function SignupFromWrapper({ children }) {
  return (
    <div className='inner-grid-2-2 signup-from-page'>
      {/* Metadata settings */}
      <Helmet>
        <title>Sign Up | YourApp</title>
        <meta name="description" content="Create a new account to access exclusive features on YourApp. Sign up with your username, email and get started in just a few minutes." />
        <meta name="keywords" content="sign up, create account, register, user registration, new account" />
        <meta property="og:title" content="Sign Up | YourApp" />
        <meta property="og:description" content="Join YourApp today! Create a new account to enjoy personalized features and stay connected." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourapp.com/sign-up" />
        <meta property="og:image" content="https://yourapp.com/static/sign-up.jpg" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {children}
    </div>
  )
}
