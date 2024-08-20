// Named Imports.
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signup } from '../../thunks/signupThunk';

// Default Imports.
import './SignupForm.scss'
import useSignupSelectors from '../../hooks/useSignupSelectors';
import CustomInput from '../customInput/CustomInput';
import Loader from '../../../../components/common/Loader';

export default function SignupForm() {
  const dispatch = useDispatch();

  // Select the auth readux context.
  const { data, status, error } = useSignupSelectors()

  // Define a initial form data for signup.
  const initialFormData = {
    username: '',
    email: '',
    password1: '',
    password2: '',
  }

  // Define a initial form data state.
  const [formData, setFormData] = useState(initialFormData)

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

  // Handle the form submation.
  function handleFormSubmit(event) {
    event.preventDefault()
    dispatch(signup(formData))
  }

  return (
    <form onSubmit={handleFormSubmit} className='signup-form'>
      <div className='signup-element'>
        <div className='action-elements'>
          <h2 className='title'>get started now</h2>
          <p className='description'>enter your credentials to create your account</p>

          <CustomInput
            type='text'
            label='username'
            name='username'
            onChange={handleFormDataChange}
            value={formData.username}
          />
          {
            error?.username && (
              <h5>{error.username}</h5>
            )
          }

          <CustomInput
            type='email'
            label='email'
            name='email'
            onChange={handleFormDataChange}
            value={formData.email}
          />
          {
            error?.email && (
              <h5>{error.email}</h5>
            )
          }

          <CustomInput
            type='password'
            label='password'
            name='password1'
            onChange={handleFormDataChange}
            value={formData.password1}
          />
          {
            error?.password1 && (
              <h5>{error.password1}</h5>
            )
          }

          <CustomInput
            type='password'
            label='confirm password'
            name='password2'
            onChange={handleFormDataChange}
            value={formData.password2}
          />
          {
            error?.password2 && (
              <h5>{error.password2}</h5>
            )
          }

          {
            status === 'loading' && (
              <button className='login-btn' type="submit">
                <Loader />
                <span>loading...</span>
              </button>
            )
          }

          {
            status !== 'loading' && (
              <button className='login-btn' type="submit">signup</button>
            )
          }

          {
            status === 'succeeded' && (
              <h5>{data.detail}</h5>
            )
          }

          <p className='login-text'>
            have an account?, <Link to="/login">login now</Link>
          </p>
        </div>
      </div>
    </form>
  )
}
