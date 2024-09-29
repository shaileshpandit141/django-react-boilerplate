import React, { useState } from 'react'
import "./ForgotPassword.scss"
import { useParams, Link } from 'react-router-dom'
import { Helmet } from "react-helmet-async"
import { useDispatch } from 'react-redux'
import { forgotPasswordConfirmThunk } from '../../thunks/forgotPasswordThunk'
import CustomInput from '../../components/customInput/CustomInput'
import Loader from '../../../../components/common/loader/Loader'
import { useForgotPasswordSelectors } from '../../hooks/useForgotPasswordSelectors'
import { LazyMaterialIcon, icons } from '../../../../lazyUtils/lazyMaterialIcon/LazyMaterialIcon'

export default function PasswordResetConfirm() {
  const dispatch = useDispatch()

  const { uid, token } = useParams()

  const { status, data, error } = useForgotPasswordSelectors()

  // Define a initial form data for login.
  const initialFormData = {
    uid: uid,
    token: token,
    new_password1: '',
    new_password2: '',
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
      dispatch(forgotPasswordConfirmThunk(formData))
      setSubmitButtonClickCount(prev => prev - 1)
    }
  }

  return (
    <>
      {/* Metadata settings */}
      <Helmet>
        <title>Enter new password</title>
      </Helmet>

      {/* Component jsx */}
      <form onSubmit={handleFormSubmit} className='inner-grid-2-2 forgot-form'>
        <div className='inputs-container'>
          <h1 className='title'>Enter new password</h1>

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

          {
            error?.error && (
              <h5>{error.error}</h5>
            )
          }

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
            status !== 'loading' && !data && (
              <button
                type="submit"
                className='button'
                disabled={submitButtonClickCount <= 0}
              >
                <span className="label">Confirm</span>
              </button>
            )
          }

          {
            data?.detail && (
              <>
                <h5>{data.detail}</h5>
                <Link to='/signin' className='link'>
                  <span className="icon">
                    <LazyMaterialIcon iconName={icons.signin} />
                  </span>
                  <span className='label'>sign in</span>
                </Link>
              </>
            )
          }
        </div>
      </form>
    </>
  )
}
