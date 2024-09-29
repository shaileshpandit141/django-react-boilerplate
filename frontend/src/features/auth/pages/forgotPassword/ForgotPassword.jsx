import React, { useState, useEffect, useCallback, useMemo } from 'react'
import "./ForgotPassword.scss"
import { Link } from "react-router-dom"
import ForgotPasswordWrapper from './ForgotPasswordWrapper'
import CustomInput from '../../components/customInput/CustomInput'
import { LazyMaterialIcon, icons } from '../../../../assets/lazyMaterialIcon/LazyMaterialIcon'
import Loader from '../../../../components/common/loader/Loader'
import emailSendSvg from '../../../../assets/icons/mail_sent.svg'
import { useDispatch } from 'react-redux'
import { forgotPasswordThunk } from '../../thunks/forgotPasswordThunk'
import { resetForgotPasswordState } from '../../slices/forgotPasswordSlice'
import { useForgotPasswordSelectors } from '../../hooks/useForgotPasswordSelectors'

export default function ForgotPassword() {
  const dispatch = useDispatch()

  const { status, data, error } = useForgotPasswordSelectors()

  // Define a initial form data for login.
  const initialFormData = useMemo(() => ({
    email: '',
  }), []);

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

  // Handle submission handler.
  const handleFormSubmit = useCallback((event) => {
    event.preventDefault();
    dispatch(forgotPasswordThunk(formData));
  }, [dispatch, formData]);

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
          {/* Buttons */}
          <div className='buttons'>
            <Link
              to="/signin"
              className="link"
            >
              <span className='icon'>
                <LazyMaterialIcon iconName={icons.Signin} />
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
          {/* Custom input component for email input */}
          <CustomInput
            type="email"
            label="Email"
            name="email"
            onChange={handleFormDataChange}
            value={formData.email}
          />
          {/* Loader with disabled button */}
          <div className='buttons'>
            <Link
              to="/signin"
              className="link"
            >
              <span className='icon'>
                <LazyMaterialIcon iconName={icons.Signin} />
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
          {/* Custom input component for email input */}
          <CustomInput
            type="email"
            label="Email"
            name="email"
            onChange={handleFormDataChange}
            value={formData.email}
          />
          {/* Error message */}
          {
            error?.email && (
              error.email.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
            )
          }
          {/* Buttons */}
          <div className='buttons'>
            <Link
              to="/signin"
              className="link"
            >
              <span className='icon'>
                <LazyMaterialIcon iconName={icons.Signin} />
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
                <LazyMaterialIcon iconName={icons.ReTry} />
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
        {/* succeeded images */}
        <div className='succeeded-img'>
          <img src={emailSendSvg} alt='email-send-svg' />
        </div>
        {/* succeeded information */}
        <div className='succeeded-info'>
          <h1 className="title">Forgot Password request is successful</h1>
          {
            data?.detail && <p className='message'>{data.detail}</p>
          }
        </div>
        {/* succeeded Response message */}
        <div className='buttons'>
          <Link
            to="/signin"
            className="link"
          >
            <span className='icon'>
              <LazyMaterialIcon iconName={icons.Signin} />
            </span>
            <span className="label">Sign in</span>
          </Link>
        </div>
      </ForgotPasswordWrapper>
    )
  }
}
