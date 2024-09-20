// Named Imports.
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import { useSignupSelectors } from '../../hooks/useSignupSelectors'
import { signupThunk } from '../../thunks/signupThunk'
import { LazyMaterialIcon, icons } from '../../../../assets/lazyMaterialIcon/LazyMaterialIcon'

// Default Imports.
import './SignupForm.scss'
import CustomInput from '../../components/customInput/CustomInput'
import Loader from '../../../../components/common/loader/Loader'

export default function SignupForm() {
    const dispatch = useDispatch()

    // Select the auth readux context.
    const { response, status, error } = useSignupSelectors()

    // Define a initial form data for signup.
    const initialFormData = {
        username: '',
        email: '',
        password1: '',
        password2: '',
    }

    // Define a initial form data state.
    const [formData, setFormData] = useState(initialFormData)
    const [signupButtonClickCount, setSignupButtonClickCount] = useState(3)

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
        if (signupButtonClickCount > 0) {
            dispatch(signupThunk(formData))
            setSignupButtonClickCount(prev => prev - 1)
        }
    }

    return (
        <>
            {/* Metadata settings */}
            <Helmet>
                <title>Signup</title>
            </Helmet>

            {/* Component jsx */}
            <form onSubmit={handleFormSubmit} className='grid-2-2 signup-form'>
                {
                    status !== 'succeeded' && (
                        <div className='inputes-container'>
                            <h3 className="title">Create your account</h3>
                            <CustomInput
                                type='text'
                                label='username'
                                name='username'
                                onChange={handleFormDataChange}
                                value={formData.username}
                            />
                            {
                                error?.username && (
                                    <h5 className='error-detail-text'>{error.username}</h5>
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
                                    <h5 className='error-detail-text'>{error.email}</h5>
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
                                    <h5 className='error-detail-text'>{error.password1}</h5>
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
                                    <h5 className='error-detail-text'>{error.password2}</h5>
                                )
                            }

                            {
                                status === 'loading' && (
                                    <button disabled className='button'>
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
                                        disabled={signupButtonClickCount <= 0 ? true : false}
                                    >
                                        <span className="icon">
                                            <LazyMaterialIcon iconName={icons.Signup} />
                                        </span>
                                        <span className='label'>signup</span>
                                    </button>
                                )
                            }
                            <p className='login-text'>
                                have an account?, <Link to="/login">login now</Link>
                            </p>
                        </div>
                    )
                }

                {
                    status === 'succeeded' && (
                        <h3>{response.detail}</h3>
                    )
                }

            </form>
        </>
    )
}
