import React, { useState } from 'react'
import "./ForgotPassword.scss"
import { Helmet } from "react-helmet-async"
import { useDispatch } from 'react-redux'
import { forgotPasswordThunk } from '../../thunks/forgotPasswordThunk'
import CustomInput from '../../components/customInput/CustomInput'
import Loader from '../../../../components/common/loader/Loader'
import { useForgotPasswordSelectors } from '../../hooks/useForgotPasswordSelectors'

export default function ForgotPassword() {
    const dispatch = useDispatch()

    const { status, data, error } = useForgotPasswordSelectors()

    // Define a initial form data for login.
    const initialFormData = {
        email: '',
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
            dispatch(forgotPasswordThunk(formData))
            setSubmitButtonClickCount(prev => prev - 1)
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
                <div className='inputs-container'>
                    <h1 className="title">Forgot Password</h1>
                    
                    <CustomInput
                        type="email"
                        label="Email"
                        name="email"
                        onChange={handleFormDataChange}
                        value={formData.email}
                    />

                    {/* Error message */}
                    {error?.error && <h5>{error.error}</h5>}

                    {/* Submit button or loader */}
                    {status === 'loading' ? (
                        <button className="button" disabled>
                            <span className="label">
                                <Loader />
                            </span>
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="button"
                            disabled={submitButtonClickCount <= 0}
                        >
                            <span className="label">Forgot</span>
                        </button>
                    )}

                    {/* Success message */}
                    {data?.detail && <h5>{data.detail}</h5>}
                </div>
            </form>
        </>
    )
}
