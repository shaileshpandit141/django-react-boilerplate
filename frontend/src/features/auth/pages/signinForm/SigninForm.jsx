import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'
import SigninFormWrapper from './SigninFormWrapper'
import CustomInput from '../../components/customInput/CustomInput'
import Loader from 'components/common/loader/Loader'
import { useDispatch } from 'react-redux'
import { useSigninSelectors } from '../../hooks/useSigninSelectors'
import { resetSigninState } from '../../slices/signinSlice'
import { signinSliceThunk } from '../../thunks/signinSliceThunk'

export default function SigninForm() {
  const dispatch = useDispatch()

  // Select the auth readux context.
  const { isAuthenticated, status, error } = useSigninSelectors()

  // Define a initial form data for login.
  const initialFormData = useMemo(() => ({
    username: '',
    password: '',
  }), [])

  // Define a initial form data state.
  const [formData, setFormData] = useState(initialFormData)
  const [retryCount, setRetryCount] = useState(1)

  // Handle form data changes.
  function handleFormDataChange(event) {
    const { name, type, chacked, value } = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? chacked : value
      }
    })
  }

  // Handle submission of form.
  const handleFormSubmit = useCallback((event) => {
    event.preventDefault()
    dispatch(signinSliceThunk(formData))
  }, [dispatch, formData])

  // Retry button click handler.
  const handleRetryButtonClick = useCallback((event) => {
    event.preventDefault()
    dispatch(resetSigninState())
    setRetryCount(prev => prev - 1)
  }, [dispatch])

  useEffect(() => {
    dispatch(resetSigninState())
  }, [dispatch])

  // Check if user is Authenticated then redirect to another Route.
  if (isAuthenticated) {
    return <Navigate to='/home' />
  }

  // Handle the idle status.
  if (status === 'idle') {
    return (
      <SigninFormWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">sign in</h1>
          {/* Custom input component for email input */}
          <CustomInput
            type='text'
            label='username'
            name='username'
            onChange={handleFormDataChange}
            value={formData.username}
          />
          {/* Custom input component for password input */}
          <CustomInput
            type='password'
            label='password'
            name='password'
            onChange={handleFormDataChange}
            value={formData.password}
          />
          <div className='forgot-container'>
            <Link to='/forgot-password' className='forgot-link'>
              <span className='label'>forgot password</span>
            </Link>
          </div>
          {/* Sign in Button. */}
          <div className='buttons'>
            <button
              type="submit"
              className='button'
            >
              <span className="icon">
                <LazyMaterialIcon iconName={icons.signin} />
              </span>
              <span className="label">sign in</span>
            </button>
          </div>
          <p className='signup-text'>
            You don't have an account?, <Link to="/signup">create an account now</Link>
          </p>
        </form>
      </SigninFormWrapper>
    )
  }

  // Handle the loading status.
  if (status === 'loading') {
    return (
      <SigninFormWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">sign in</h1>
          {/* Custom input component for email input */}
          <CustomInput
            type='text'
            label='username'
            name='username'
            onChange={handleFormDataChange}
            value={formData.username}
            disabled
          />
          {/* Custom input component for password input */}
          <CustomInput
            type='password'
            label='password'
            name='password'
            onChange={handleFormDataChange}
            value={formData.password}
            disabled
          />

          {/* Sign in Button. */}
          <div className='buttons'>
            <button className="button" disabled>
              <span className="label">
                <Loader />
              </span>
            </button>
          </div>
          <p className='signup-text'>
            You don't have an account?, <Link to="/signup">create an account now</Link>
          </p>
        </form>
      </SigninFormWrapper>
    )
  }

  // Handle the failed status.
  if (status === 'failed') {
    return (
      <SigninFormWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">sign in</h1>
          {/* Custom input component for email input */}
          <CustomInput
            type='text'
            label='username'
            name='username'
            onChange={handleFormDataChange}
            value={formData.username}
            disabled
          />
          {/* Error message for Missing Required Field username. */}
          {
            error?.username && (
              error.username.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
            )
          }
          {/* Custom input component for password input. */}
          <CustomInput
            type='password'
            label='password'
            name='password'
            onChange={handleFormDataChange}
            value={formData.password}
            disabled
          />
          {/* Error message for Missing Required Field password. */}
          {
            error?.password && (
              error.password.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
            )
          }
          {/* Error message for Invalid Credentials (wrong username or password). */}
          {
            error?.non_field_errors && (
              error.non_field_errors.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
            )
          }
          {/* Error message for user account is active or not. */}
          {
            error?.account_status && (
              error.account_status.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
            )
          }
          {/* Error message for user is not verified. */}
          {
            error?.verification_error && (
              <div className="account-verify-cntainer">
                <div className='error-text-container'>
                  {
                    error.verification_error.map((detail, index) => (
                      <p className='error-text' key={index}>{detail}</p>
                    ))
                  }
                </div>
                <Link
                  to="/resend-verification-key"
                  className='link'
                >
                  <span className='table'>verify it</span>
                </Link>
              </div>
            )
          }
          {/* Sign in Button. */}
          <div className='buttons'>
            <button
              className="button"
              type='button'
              onClick={handleRetryButtonClick}
              disabled={retryCount <= 0}
            >
              <span className="icon">
                <LazyMaterialIcon iconName={icons.reTry} />
              </span>
              <span className='label'>retry</span>
            </button>
          </div>
          <p className='signup-text'>
            You don't have an account?, <Link to="/signup">create an account now</Link>
          </p>
        </form>
      </SigninFormWrapper>
    )
  }

  // Handle succeeded status.
  if (status === 'succeeded') {
    return (
      <SigninFormWrapper>
        {/* succeeded images. */}
        {/* <div className='succeeded-img'>
        </div> */}
        {/* succeeded information. */}
        <div className='succeeded-info'>
          <h1 className="title">The request was successful</h1>
          <p className='message'>if you want to display response data, handle here.</p>
        </div>
        {/* buttons */}
        {/* <div className='buttons'>
        </div> */}
      </SigninFormWrapper>
    )
  }
}
