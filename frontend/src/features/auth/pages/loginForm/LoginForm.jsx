// Named Imports.
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import { useAuthSelectors } from '../../hooks/useAuthSelectors'
import { loginThunk } from '../../thunks/authThunk'

// Default Imports.
import './LoginForm.scss'
import CustomInput from '../../components/customInput/CustomInput'
import Loader from '../../../../components/common/Loader'

export default function LoginForm() {
    const dispatch = useDispatch()

    // Select the auth readux context.
    const { isAuthenticated, status, error } = useAuthSelectors()

    // Define a initial form data for login.
    const initialFormData = {
        username: '',
        password: '',
    }

    // Define a initial form data state.
    const [formData, setFormData] = useState(initialFormData)
    const [loginButtonClickCount, setLoginButtonClickCount] = useState(3)

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
        dispatch(loginThunk(formData))
        if (loginButtonClickCount > 0) {
            dispatch(loginThunk(formData))
            setLoginButtonClickCount(prev => prev - 1)
        }
    }

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
            <form onSubmit={handleFormSubmit} className='inner-grid-2-2 login-form'>
                <div className='inputes-container'>
                    <h3 className='title'>access your account</h3>
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
                                disabled={loginButtonClickCount <= 0 ? true : false}
                            >
                                <span className="label">login</span>
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
