import React, { useState, useEffect } from 'react'
import './SigninForm.scss'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import { useSigninSelectors } from '../../hooks/useSigninSelectors'
import { resetSigninState } from '../../slices/signinSlice'
import { signinSliceThunk } from '../../thunks/signinSliceThunk'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'
import CustomInput from '../../components/customInput/CustomInput'
import Loader from 'components/common/loader/Loader'

export default function SigninForm() {
  const dispatch = useDispatch()

  // Select the auth readux context.
  const { isAuthenticated, status, error } = useSigninSelectors()

  // Define a initial form data for login.
  const initialFormData = {
    username: '',
    password: '',
  }

  // Define a initial form data state.
  const [formData, setFormData] = useState(initialFormData)
  const [submitButtonClickCount, setSubmitButtonClickCount] = useState(3)

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
  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (submitButtonClickCount > 0) {
      dispatch(signinSliceThunk(formData))
      setSubmitButtonClickCount(prev => prev - 1)
    }
  }

  useEffect(() => {
    dispatch(resetSigninState())
  }, [dispatch])

  // Check if user is Authenticated then redirect to another Route.
  if (isAuthenticated) {
    return <Navigate to='/home' />
  }

  return (
    <>
      {/* Metadata settings */}
      <Helmet>
        <title>Login</title>
      </Helmet>

      {/* Component jsx */}
      <form onSubmit={handleFormSubmit} className='inner-grid-2-2 signin-form'>
        <div className='inputs-container'>
          <h1 className='title'>sign in</h1>
          <CustomInput
            type='text'
            label='username'
            name='username'
            onChange={handleFormDataChange}
            value={formData.username}
          />

          <CustomInput
            type='password'
            label='password'
            name='password'
            onChange={handleFormDataChange}
            value={formData.password}
          />
          {
            error?.detail && (
              <div className="account-verify-cntainer">
                <h5>{error.detail}</h5>
                {
                  error.detail === "Account is not verified" && (
                    <Link to="/resend-verification-key">verify it</Link>
                  )
                }

              </div>
            )
          }

          <Link to="/forgot-password" className='forgot-password'>forgot password</Link>

          {
            status === 'loading' && (
              <button className='button' disabled>
                <span className="label">
                  <Loader />
                </span>
              </button>
            )
          }

          {
            status !== 'loading' && (
              <button
                type="submit"
                className='button'
                disabled={submitButtonClickCount <= 0}
              >
                <span className="icon">
                  <LazyMaterialIcon iconName={icons.signin} />
                </span>
                <span className="label">sign in</span>
              </button>
            )
          }
          <p className='signup-text'>
            You don't have an account?, <Link to="/signup">create an account now</Link>
          </p>
        </div>
      </form>
    </>
  )
}
