import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from "react-router-dom"
import ForgotPasswordWrapper from './ForgotPasswordWrapper'
import CustomInput from '../../components/customInput/CustomInput'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'
import Loader from 'components/common/loader/Loader'
import emailSendSvg from 'assets/icons/mail_sent.svg'
import { useDispatch } from 'react-redux'
import { forgotPasswordThunk } from '../../thunks/forgotPasswordThunk'
import { useForgotPasswordSelector } from '../../hooks/useForgotPasswordSelector'
import { resetForgotPasswordState } from '../../slices/forgotPasswordSlice'
import { toast } from 'react-toastify'
import DisplayError from '../../components/displayError/DisplayError'
import useFormDataChange from 'hooks/useFormDataChange'

export default function ForgotPassword() {
  const dispatch = useDispatch()
  const { status, data, error } = useForgotPasswordSelector()

  // Define a initial form data for login.
  const initialFormData = useMemo(() => ({
    email: '',
  }), [])

  // Handle form data changes.
  const [formData, handleFormDataChange] = useFormDataChange(initialFormData)

  // Define a initial form data state.
  const [retryCount, setRetryCount] = useState(1)

  // Handle submission of form.
  const handleFormSubmit = useCallback((event) => {
    event.preventDefault()
    dispatch(forgotPasswordThunk(formData))
  }, [dispatch, formData])

  // Retry button click handler.
  const handleRetryButtonClick = useCallback((event) => {
    event.preventDefault()
    dispatch(resetForgotPasswordState())
    setRetryCount(prev => prev - 1)
  }, [dispatch])

  // Rest the State if user is visit page without any action.
  useEffect(() => {
    dispatch(resetForgotPasswordState())
  }, [dispatch])

  // Trigger toast notifications based on the status or error
  useEffect(() => {
    if (status === 'failed') {
      if (error?.email) {
        toast.error('Invalid email. Please try again')
      }
    }
    if (status === 'succeeded') {
      toast.success('Password change request successful! Email sent')
    }
  }, [status, error])

  // Handle the idle status.
  if (status === 'idle') {
    return (
      <ForgotPasswordWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">Forgot Password</h1>
          {/* Custom input component for email input */}
          <CustomInput
            type="email"
            label="Email"
            name="email"
            onChange={handleFormDataChange}
            value={formData.email}
          />
          {/* Sign in and Forgot Buttons. */}
          <div className='buttons'>
            <Link
              to="/signin"
              className="link"
            >
              <span className='icon'>
                <LazyMaterialIcon iconName={icons.signin} />
              </span>
              <span className="label">Sign in</span>
            </Link>
            <button
              type="submit"
              className="button"
            >
              <span className="label">Forgot</span>
            </button>
          </div>
        </form>
      </ForgotPasswordWrapper>
    )
  }

  // Handle the loading status.
  if (status === 'loading') {
    return (
      <ForgotPasswordWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">Forgot Password</h1>
          {/* Custom input component for email input. */}
          <CustomInput
            type="email"
            label="Email"
            name="email"
            onChange={handleFormDataChange}
            value={formData.email}
            disabled
          />
          {/* Loader with disabled button. */}
          <div className='buttons'>
            <Link
              to="/signin"
              className="link"
            >
              <span className='icon'>
                <LazyMaterialIcon iconName={icons.signin} />
              </span>
              <span className="label">Sign in</span>
            </Link>
            <button className="button" disabled>
              <span className="label">
                <Loader />
              </span>
            </button>
          </div>
        </form>
      </ForgotPasswordWrapper>
    )
  }

  // Handle the failed status.
  if (status === 'failed') {
    return (
      <ForgotPasswordWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">Forgot Password</h1>
          {/* Custom input component for email input. */}
          <CustomInput
            type="email"
            label="Email"
            name="email"
            onChange={handleFormDataChange}
            value={formData.email}
            disabled
          />
          {/* Error message for email is not exit. */}
          {
            error?.email && (
              <DisplayError message={error.email} />
            )
          }
          {/* Sign in and retry Buttons. */}
          <div className='buttons'>
            <Link
              to="/signin"
              className="link"
            >
              <span className='icon'>
                <LazyMaterialIcon iconName={icons.signin} />
              </span>
              <span className="label">Sign in</span>
            </Link>
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
        </form>
      </ForgotPasswordWrapper>
    )
  }

  // Handle succeeded status and response data state.
  if (status === 'succeeded' && data) {
    return (
      <ForgotPasswordWrapper>
        {/* succeeded images. */}
        <div className='succeeded-img'>
          <img src={emailSendSvg} alt='email-send-svg' />
        </div>
        {/* succeeded information. */}
        <div className='succeeded-info'>
          <h1 className="title">The request was successful</h1>
          {
            data?.detail && <p className='message'>{data.detail}</p>
          }
        </div>
        {/* sign in page link. */}
        <div className='buttons'>
          <Link
            to="/signin"
            className="link"
          >
            <span className='icon'>
              <LazyMaterialIcon iconName={icons.signin} />
            </span>
            <span className="label">Sign in</span>
          </Link>
        </div>
      </ForgotPasswordWrapper>
    )
  }

  // Handle succeeded status and if response data state is empty.
  if (status === 'succeeded') {
    return (
      <ForgotPasswordWrapper>
        {/* succeeded images. */}
        <div className='succeeded-img'>
          <img src={emailSendSvg} alt='email-send-svg' />
        </div>
        {/* succeeded information. */}
        <div className='succeeded-info'>
          <h1 className="title">The request was successful</h1>
          <p className='message'>Password change e-mail has been send.</p>
        </div>
        {/* sign in page link. */}
        <div className='buttons'>
          <Link
            to="/signin"
            className="link"
          >
            <span className='icon'>
              <LazyMaterialIcon iconName={icons.signin} />
            </span>
            <span className="label">Sign in</span>
          </Link>
        </div>
      </ForgotPasswordWrapper>
    )
  }
}
