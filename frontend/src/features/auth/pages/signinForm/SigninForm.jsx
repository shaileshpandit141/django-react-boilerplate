import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'
import SigninFormWrapper from './SigninFormWrapper'
import CustomInput from '../../components/customInput/CustomInput'
import Loader from 'components/common/loader/Loader'
import { useDispatch } from 'react-redux'
import { useSigninSelector } from '../../hooks/useSigninSelector'
import { resetSigninState } from '../../slices/signinSlice'
import { signinThunk } from '../../thunks/signinThunk'
import { toast } from 'react-toastify'
import DisplayError from '../../components/displayError/DisplayError'
import useFormDataChange from 'hooks/useFormDataChange'
import SigninFormSkeleton from './SigninFormSkeleton'

export default function SigninForm() {
  const dispatch = useDispatch()

  // Select the auth readux context.
  const { isAuthenticated, status, error } = useSigninSelector()

  // Define a initial form data for login.
  const initialFormData = useMemo(() => ({
    username: '',
    password: '',
  }), [])

  // Handle form data changes.
  const [formData, handleFormDataChange] = useFormDataChange(initialFormData)

  // Define a initial form data state.
  const [retryCount, setRetryCount] = useState(1)

  // Handle submission of form.
  const handleFormSubmit = useCallback((event) => {
    event.preventDefault()
    dispatch(signinThunk(formData))
  }, [dispatch, formData])

  // Retry button click handler.
  const handleRetryButtonClick = useCallback((event) => {
    event.preventDefault()
    dispatch(resetSigninState())
    setRetryCount(prev => prev - 1)
  }, [dispatch])

  // Trigger toast notifications based on the status or error
  useEffect(() => {
    if (status === 'failed') {
      if (error?.non_field_errors) {
        toast.error('Invalid credentials. Please try again')
      }
      if (error?.account_status) {
        toast.error('This account is not active')
      }
      if (error?.verification_error) {
        toast.warn('Account not verified. Please verify')
      }
    }
    if (status === 'succeeded') {
      toast.success('Sign-in successful!')
    }
  }, [status, error])

  if (isAuthenticated) {
    return <Navigate to='/home' />
  }

  // Handle the idle status.
  if (status === 'idle') {
    return (
      <SigninFormWrapper>
        {/* <SigninFormSkeleton /> */}
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
          {/* Forgot password page link */}
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
          {/* Forgot password page link */}
          <div className='forgot-container'>
            <Link to='/forgot-password' className='forgot-link'>
              <span className='label'>forgot password</span>
            </Link>
          </div>
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
              <DisplayError message={error.username} />
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
              <DisplayError message={error.password} />
            )
          }
          {/* Error message for Invalid Credentials (wrong username or password). */}
          {
            error?.non_field_errors && (
              <DisplayError message={error.non_field_errors} />
            )
          }
          {/* Error message for user account is active or not. */}
          {
            error?.account_status && (
              <DisplayError message={error.account_status} />
            )
          }
          {/* Error message for user is not verified. */}
          {
            error?.verification_error && (
              <div className="account-verify-cntainer">
                <div className='error-text-container'>
                  {
                    <DisplayError message={error.verification_error} />
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
          {/* retry Button. */}
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
    return <Navigate to='/home' />
  }
}
