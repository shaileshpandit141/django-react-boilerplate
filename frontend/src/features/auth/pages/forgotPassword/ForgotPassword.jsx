import React, { useState } from 'react'
import "./ForgotPassword.scss"
import { Helmet } from "react-helmet-async"
import { useDispatch } from 'react-redux'
import { forgotPasswordThunk } from '../../thunks/forgotPasswordThunk'
import CustomInput from '../../components/customInput/CustomInput'
import Loader from '../../../../components/common/loader/Loader'
import { useForgotPassword } from '../../hooks/useForgotPassword'

export default function ForgotPassword() {
    const dispatch = useDispatch()

    const { status, data, error } = useForgotPassword()

    // Define a initial form data for login.
    const initialFormData = {
        email: '',
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
        if (loginButtonClickCount > 0) {
            dispatch(forgotPasswordThunk(formData))
            setLoginButtonClickCount(prev => prev - 1)
        }
    }

    return (
        <>
            {/* Metadata settings */}
            <Helmet>
                <title>forgot password</title>
            </Helmet>

            {/* Component jsx */}
            <form onSubmit={handleFormSubmit} className='inner-grid-2-2 forgot-form'>
                <div className='inputes-container'>
                    <h1 className='title'>forgot password</h1>

                    <CustomInput
                        type='email'
                        label='email'
                        name='email'
                        onChange={handleFormDataChange}
                        value={formData.email}
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
                                disabled={loginButtonClickCount <= 0 ? true : false}
                            >
                                <span className="label">forgot</span>
                            </button>
                        )
                    }

                    {
                        data?.detail && (
                            <h5>{data.detail}</h5>
                        )
                    }
                </div>
            </form>
        </>
    )
}
