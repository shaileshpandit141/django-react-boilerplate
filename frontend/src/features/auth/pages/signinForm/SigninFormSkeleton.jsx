import React from 'react'
import './SigninForm.scss'
import SigninFormWrapper from './SigninFormWrapper'

export default function SigninFormSkeleton(props) {
  return (
    <SigninFormWrapper>
      <form className='form'>
        <span className="title h1-skeleton"></span>
        {/* Custom input component for email input */}
        <span className='input-skeleton skeleton'></span>
        {/* Custom input component for password input */}
        <span className='input-skeleton skeleton'></span>
        {/* Forgot password page link */}
        <div className='forgot-container'>
          <span className='p-skeleton'></span>
        </div>
        {/* Sign in Button. */}
        <div className='buttons'>
          <span className='button-skeleton skeleton'></span>
        </div>
        <div className='signup-text-skeleton'>
          <span className='p-skeleton'></span>
          <span className='p-skeleton'></span>
        </div>
      </form>
    </SigninFormWrapper>
  )
}
