import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useResendVerificationKeySelectors } from '../../hooks/useResendVerificationKeySelectors';
import { resendVerificationKeyThunk } from '../../thunks/resendVerificationKeyThunk';
import CustomInput from '../../components/customInput/CustomInput';
import Loader from '../../../../components/common/Loader';
import './ResendVerificationKey.scss';

export default function ResendVerificationKey(props) {

    const dispatch = useDispatch();

    const { error, data, status } = useResendVerificationKeySelectors()

    // Define a initial form data for login.
    const initialFormData = {
        username: '',
    };

    // Define a initial form data state.
    const [formData, setFormData] = useState(initialFormData);

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
        event.preventDefault();
        if (status === 'idle') {
            dispatch(resendVerificationKeyThunk(formData));
        }
    };

    return (
        <>
            {/* Metadata settings */}
            <Helmet>
                <title>Resend Verification Key</title>
            </Helmet>

            {/* Component jsx */}
            <form onSubmit={handleFormSubmit} className='re-verification-key-form'>
                <div className='re-verification-key-container'>
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
                                        <div className="buttton-wrapper">
                                            <button type="submit">
                                                <span className='icon'>
                                                    <Loader />
                                                </span>
                                            </button>
                                        </div>
                                    )
                                }

                                {
                                    status !== 'loading' && (
                                        <div className="button-wrapper">
                                            <button type="submit">
                                                <span className='label'>send</span>
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }

                    {
                        error && (
                            <h3 className='title'>{error?.detail}</h3>
                        )
                    }

                    {
                        data && (
                            <h3 className='title'>{data?.detail}</h3>
                        )
                    }
                </div>
            </form>
        </>
    );
}
