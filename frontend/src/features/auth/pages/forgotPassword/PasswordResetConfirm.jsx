import React, { useState, useEffect, useCallback, useMemo } from 'react'
import "./ForgotPassword.scss"
import { useParams, Link } from 'react-router-dom'
import PasswordResetConfirmWrapper from './PasswordResetConfirmWrapper'
import CustomInput from '../../components/customInput/CustomInput'
import Loader from 'components/common/loader/Loader'
import { useForgotPasswordSelectors } from '../../hooks/useForgotPasswordSelectors'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'
import { useDispatch } from 'react-redux'
import { forgotPasswordConfirmThunk } from '../../thunks/forgotPasswordThunk'
import { resetForgotPasswordState } from '../../slices/forgotPasswordSlice'

export default function PasswordResetConfirm() {
  const dispatch = useDispatch()
  const { uid, token } = useParams()
  const { status, data, error } = useForgotPasswordSelectors()

  // Define a initial form data for login.
  const initialFormData = useMemo(() => ({
    uid: uid,
    token: token,
    new_password1: '',
    new_password2: '',
  }), [token, uid])

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

  // Handle the form submation.
  const handleFormSubmit = useCallback((event) => {
    event.preventDefault()
    dispatch(forgotPasswordConfirmThunk(formData))
  }, [dispatch, formData])

  // Retry button click handler.
  const handleRetryButtonClick = useCallback((event) => {
    event.preventDefault();
    dispatch(resetForgotPasswordState());
    setRetryCount(prev => prev - 1);
  }, [dispatch]);

  // Rest the Forgot Password State if user is visit page without any action.
  useEffect(() => {
    dispatch(resetForgotPasswordState())
  }, [dispatch])

  // Handle the idle status.
  if (status === 'idle') {
    return (
      <PasswordResetConfirmWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">Enter new password</h1>
          {/* Custom input component for passwords input. */}
          <CustomInput
            type='password'
            label='password'
            name='new_password1'
            onChange={handleFormDataChange}
            value={formData.new_password1}
          />
          <CustomInput
            type='password'
            label='confirm password'
            name='new_password2'
            onChange={handleFormDataChange}
            value={formData.new_password2}
          />
          {/* Confirm Buttons. */}
          <div className='buttons'>
            <button
              type="submit"
              className='button'
            >
              <span className="label">Confirm</span>
            </button>
          </div>
        </form>
      </PasswordResetConfirmWrapper>
    )
  }

  // Handle the loading status.
  if (status === 'loading') {
    return (
      <PasswordResetConfirmWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">Enter new password</h1>
          {/* Custom input component for passwords input. */}
          <CustomInput
            type='password'
            label='password'
            name='new_password1'
            onChange={handleFormDataChange}
            value={formData.new_password1}
            disabled
          />
          <CustomInput
            type='password'
            label='confirm password'
            name='new_password2'
            onChange={handleFormDataChange}
            value={formData.new_password2}
            disabled
          />
          {/* Buttons */}
          <div className='buttons'>
            <button className="button" disabled>
              <span className="label">
                <Loader />
              </span>
            </button>
          </div>
        </form>
      </PasswordResetConfirmWrapper>
    )
  }

  // Handle the failed status.
  if (status === 'failed') {
    return (
      <PasswordResetConfirmWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">Enter new password</h1>
          {/* Custom input component for email input. */}
          <CustomInput
            type='password'
            label='password'
            name='new_password1'
            onChange={handleFormDataChange}
            value={formData.new_password1}
            disabled
          />
          <CustomInput
            type='password'
            label='confirm password'
            name='new_password2'
            onChange={handleFormDataChange}
            value={formData.new_password2}
            disabled
          />
          {/* Error message for token is expire. */}
          {
            error?.token && (
              error.token.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
            )
          }
          {/* Error message for uid is expire. */}
          {
            error?.uid && (
              error.uid.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
            )
          }
          {/* Error message for new_password2 is did not match to new_password1. */}
          {
            error?.new_password2 && (
              error.new_password2.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
            )
          }
          {/* Buttons */}
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
        </form>
      </PasswordResetConfirmWrapper>
    )
  }

  // Handle succeeded status and response data state.
  if (status === 'succeeded' && data) {
    return (
      <PasswordResetConfirmWrapper>
        {/* succeeded images. */}
        {/* <div className='succeeded-img'>
          <img src={emailSendSvg} alt='email-send-svg' />
        </div> */}
        {/* succeeded information */}
        <div className='succeeded-info'>
          <h1 className="title">Forgot Password is successful</h1>
          {
            data?.detail && <p className='message'>{data.detail}</p>
          }
        </div>
        {/* succeeded Response message. */}
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
      </PasswordResetConfirmWrapper>
    )
  }
}
