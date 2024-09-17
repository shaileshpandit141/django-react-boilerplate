import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import { useResendVerificationKeySelectors } from '../../hooks/useResendVerificationKeySelectors'
import { resendVerificationKeyThunk } from '../../thunks/resendVerificationKeyThunk'
import CustomInput from '../../components/customInput/CustomInput'
import Loader from '../../../../components/common/Loader'
import './ResendVerificationKey.scss'

export default function ResendVerificationKey(props) {

    const dispatch = useDispatch()

    const { error, data, status } = useResendVerificationKeySelectors()

    // Define a initial form data for login.
    const initialFormData = {
        username: '',
    }

    // Define a initial form data state.
    const [formData, setFormData] = useState(initialFormData)

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
        if (status === 'idle') {
            dispatch(resendVerificationKeyThunk(formData))
        }
    }

    return (
        <>
            {/* Metadata settings */}
            <Helmet>
                <title>Resend Verification Key</title>
            </Helmet>

            {/* Component jsx */}
            <form onSubmit={handleFormSubmit} className='inner-grid-2-2 re-verification-from'>
                {
                    status === "idle" && (
                        <div className='inputes-container'>
                            <h3 className='title'>Resend Verification Key</h3>
                            <CustomInput
                                type='text'
                                label='username'
                                name='username'
                                onChange={handleFormDataChange}
                                value={formData.username}
                            />

                            {
                                status === 'loading' && (
                                    <button type="submit" className='button'>
                                        <span className="label">
                                            <Loader />
                                        </span>
                                    </button>
                                )
                            }

                            {
                                status !== 'loading' && (
                                    <button type="submit" className='button'>
                                        <span className='label'>send</span>
                                    </button>
                                )
                            }
                        </div>
                    )
                }

                {
                    error?.detail && (
                        <h3 className='title'>{error.detail}</h3>
                    )
                }

                {
                    data?.detail && (
                        <h3 className='title'>{data.detail}</h3>
                    )
                }
            </form>
        </>
    )
}
