import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SignupFromWrapper from './SignupFromWrapper'
import CustomInput from '../../components/customInput/CustomInput'
import Loader from 'components/common/loader/Loader'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'
import { useDispatch } from 'react-redux'
import { useSignupSelectors } from '../../hooks/useSignupSelectors'
import { signupThunk } from '../../thunks/signupThunk'
import { resetSignupState } from 'features/auth/slices/signupSlice'

export default function SignupForm() {
  const dispatch = useDispatch()

  // Select the auth readux context.
  const { status, data, error } = useSignupSelectors()

  // Define a initial form data for signup.
  const initialFormData = useMemo(() => ({
    username: '',
    email: '',
    password1: '',
    password2: '',
  }), [])

  // Define a initial form data state.
  const [formData, setFormData] = useState(initialFormData)
  const [retryCount, setRetryCount] = useState(1)

  // Handle form data changes.
  function handleFormDataChange(event) {
    const { name, type, checked, value } = event.target
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value
      }
    })
  }

  // Handle submission of form.
  const handleFormSubmit = useCallback((event) => {
    event.preventDefault()
    dispatch(signupThunk(formData))
  }, [dispatch, formData])

  // Retry button click handler.
  const handleRetryButtonClick = useCallback((event) => {
    event.preventDefault()
    dispatch(resetSignupState())
    setRetryCount(prev => prev - 1)
  }, [dispatch])

  // Rest the State if user is visit page without any action.
  useEffect(() => {
    dispatch(resetSignupState())
  }, [dispatch])

  // Handle the idle state.
  if (status === 'idle') {
    return (
      <SignupFromWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">sign up</h1>
          {/* Custom input component for username input */}
          <CustomInput
            type='text'
            label='username'
            name='username'
            onChange={handleFormDataChange}
            value={formData.username}
          />
          {/* Custom input component for email input */}
          <CustomInput
            type='email'
            label='email'
            name='email'
            onChange={handleFormDataChange}
            value={formData.email}
          />
          {/* Custom input component for password input */}
          <CustomInput
            type='password'
            label='password'
            name='password1'
            onChange={handleFormDataChange}
            value={formData.password1}
          />
          {/* Custom input component for confirm password input */}
          <CustomInput
            type='password'
            label='confirm password'
            name='password2'
            onChange={handleFormDataChange}
            value={formData.password2}
          />
          {/* Sign up Button. */}
          <div className='buttons'>
            <button
              type="submit"
              className='button'
            >
              <span className="icon">
                <LazyMaterialIcon iconName={icons.signup} />
              </span>
              <span className='label'>sign up</span>
            </button>
          </div>
          <p className='signin-text'>
            have an account?, <Link to="/signin">sign in now</Link>
          </p>
        </form>
      </SignupFromWrapper>
    )
  }

  // Handle the loading status.
  if (status === 'loading') {
    return (
      <SignupFromWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">sign up</h1>
          {/* Custom input component for username input */}
          <CustomInput
            type='text'
            label='username'
            name='username'
            onChange={handleFormDataChange}
            value={formData.username}
            disabled
          />
          {/* Custom input component for email input */}
          <CustomInput
            type='email'
            label='email'
            name='email'
            onChange={handleFormDataChange}
            value={formData.email}
            disabled
          />
          {/* Custom input component for password input */}
          <CustomInput
            type='password'
            label='password'
            name='password1'
            onChange={handleFormDataChange}
            value={formData.password1}
            disabled
          />
          {/* Custom input component for confirm password input */}
          <CustomInput
            type='password'
            label='confirm password'
            name='password2'
            onChange={handleFormDataChange}
            value={formData.password2}
            disabled
          />
          {/* Sign up Button as a loader. */}
          <div className='buttons'>
            <button className="button" disabled>
              <span className="label">
                <Loader />
              </span>
            </button>
          </div>
          <p className='signin-text'>
            have an account?, <Link to="/signin">sign in now</Link>
          </p>
        </form>
      </SignupFromWrapper>
    )
  }

  // Handle the failed status.
  if (status === 'failed') {
    return (
      <SignupFromWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">sign up</h1>
          {/* Custom input component for username input */}
          <CustomInput
            type='text'
            label='username'
            name='username'
            onChange={handleFormDataChange}
            value={formData.username}
            disabled
          />
          {/* error message for username */}
          {
            error?.username && (
              error.username.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
            )
          }
          {/* Custom input component for email input */}
          <CustomInput
            type='email'
            label='email'
            name='email'
            onChange={handleFormDataChange}
            value={formData.email}
            disabled
          />
          {/* error message for email */}
          {
            error?.email && (
              error.email.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
            )
          }
          {/* Custom input component for password input */}
          <CustomInput
            type='password'
            label='password'
            name='password1'
            onChange={handleFormDataChange}
            value={formData.password1}
            disabled
          />
          {/* error message for password1 */}
          {
            error?.password1 && (
              error.password1.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
            )
          }
          {/* Custom input component for confirm password input */}
          <CustomInput
            type='password'
            label='confirm password'
            name='password2'
            onChange={handleFormDataChange}
            value={formData.password2}
            disabled
          />
          {/* error message for password2 */}
          {
            error?.password2 && (
              error.password2.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
            )
          }
          {/* error message for non field errors */}
          {
            error?.non_field_errors && (
              error.non_field_errors.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
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
          <p className='signin-text'>
            have an account?, <Link to="/signin">sign in now</Link>
          </p>
        </form>
      </SignupFromWrapper>
    )
  }

  // Handle succeeded status and response data state.
  if (status === 'succeeded' && data) {
    return (
      <SignupFromWrapper>
        {/* succeeded images. */}
        {/* <div className='succeeded-img'>
          <img src={imgURL} alt='email-send-svg' />
        </div> */}
        {/* succeeded information. */}
        <div className='succeeded-info'>
          <h1 className="title">registation request is successful</h1>
          {
            data?.detail && <p className='message'>{data.detail}</p>
          }
        </div>
        {/* sign in page link. */}
        <div className='buttons'>
          <Link
            to="/"
            className="link"
          >
            <span className='icon'>
              <LazyMaterialIcon iconName={icons.arrowBack} />
            </span>
            <span className="label">Return to home</span>
          </Link>
        </div>
      </SignupFromWrapper>
    )
  }

  // Handle succeeded status and if response data state is empty.
  if (status === 'succeeded') {
    return (
      <SignupFromWrapper>
        {/* succeeded images. */}
        {/* <div className='succeeded-img'>
          <img src={imgURL} alt='email-send-svg' />
        </div> */}
        {/* succeeded information. */}
        <div className='succeeded-info'>
          <h1 className="title">registation request is successful</h1>
          <p className='message'>verification e-mail has been send.</p>
        </div>
        {/* sign in page link. */}
        <div className='buttons'>
          <Link
            to="/"
            className="link"
          >
            <span className='icon'>
              <LazyMaterialIcon iconName={icons.arrowBack} />
            </span>
            <span className="label">Return to home</span>
          </Link>
        </div>
      </SignupFromWrapper>
    )
  }
}
