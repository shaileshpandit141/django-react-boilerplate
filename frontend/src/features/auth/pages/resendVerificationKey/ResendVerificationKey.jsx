import React, { useState, useEffect, useCallback, useMemo } from 'react'
import './ResendVerificationKey.scss'
import ResendVerificationKeyWrapper from './RsendVerificationKeyWrapper'
import CustomInput from '../../components/customInput/CustomInput'
import Loader from 'components/common/loader/Loader'
import { Link } from 'react-router-dom'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'
import { useDispatch } from 'react-redux'
import { resetResendVerificationKeyState } from 'features/auth/slices/resendVerificationKeySlice'
import { useResendVerificationKeySelectors } from '../../hooks/useResendVerificationKeySelectors'
import { resendVerificationKeyThunk } from '../../thunks/resendVerificationKeyThunk'

export default function ResendVerificationKey(props) {
  const dispatch = useDispatch()
  const { status, data, error } = useResendVerificationKeySelectors()
  
  // Define a initial form data for login.
  const initialFormData = useMemo(() => ({
    username: '',
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

  // Handle the form submation.
  const handleFormSubmit = useCallback((event) => {
    event.preventDefault()
    dispatch(resendVerificationKeyThunk(formData))
  }, [dispatch, formData])

  // Retry button click handler.
  const handleRetryButtonClick = useCallback((event) => {
    event.preventDefault();
    dispatch(resetResendVerificationKeyState());
    setRetryCount(prev => prev - 1);
  }, [dispatch]);

  // Rest the State if user is visit page without any action.
  useEffect(() => {
    dispatch(resetResendVerificationKeyState())
  }, [dispatch])

  // Handle the idle status.
  if (status === 'idle') {
    return (
      <ResendVerificationKeyWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">send verification request</h1>
          {/* Custom input component for username input */}
          <CustomInput
            type="text"
            label="Username"
            name="username"
            onChange={handleFormDataChange}
            value={formData.username}
          />
          {/* Sign in and Send Buttons. */}
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
              <span className="label">Send</span>
            </button>
          </div>
        </form>
      </ResendVerificationKeyWrapper>
    )
  }

  // Handle the loading status.
  if (status === 'loading') {
    return (
      <ResendVerificationKeyWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">send verification request</h1>
          {/* Custom input component for email input */}
          <CustomInput
            type="text"
            label="Username"
            name="username"
            onChange={handleFormDataChange}
            value={formData.username}
            disabled
          />
          {/* Sign in and loader as Buttons. */}
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
      </ResendVerificationKeyWrapper>
    )
  }

  // Handle the failed status.
  if (status === 'failed') {
    return (
      <ResendVerificationKeyWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">send verification request</h1>
          {/* Custom input component for email input */}
          <CustomInput
            type="text"
            label="Username"
            name="username"
            onChange={handleFormDataChange}
            value={formData.username}
            disabled
          />
          {/* Error message for username is not exit. */}
          {
            error?.username && (
              error.username.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
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
      </ResendVerificationKeyWrapper>
    )
  }

  // Handle succeeded status and response data state.
  if (status === 'succeeded' && data) {
    return (
      <ResendVerificationKeyWrapper>
        {/* succeeded images. */}
        {/* <div className='succeeded-img'>
          <img src={imgURL} alt='email-send-svg' />
        </div> */}
        {/* succeeded information. */}
        <div className='succeeded-info'>
          <h1 className="title">verification request is successful</h1>
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
      </ResendVerificationKeyWrapper>
    )
  }
}
