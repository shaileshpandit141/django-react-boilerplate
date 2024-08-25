// Named Imports.
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { login } from '../../thunks/authThunk';

// Default Imports.
import './LoginForm.scss'
import useAuthSelector from '../../hooks/useAuthSelectors';
import CustomInput from '../customInput/CustomInput';
import Loader from '../../../../components/common/Loader';

export default function LoginForm() {
    const dispatch = useDispatch();

    // Select the auth readux context.
    const { isAuthenticated, status, error } = useAuthSelector()

    // Define a initial form data for login.
    const initialFormData = {
        username: '',
        password: '',
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
        dispatch(login(formData));
    };

    // Check if user is Authenticated then redirect to another Route.
    if (isAuthenticated) {
        return <Navigate to='/' />
    }

    return (
        <>
            {/* Metadata settings */}
            <Helmet>
                <title>Login</title>
            </Helmet>

            {/* Component jsx */}
            <form onSubmit={handleFormSubmit} className='login-form'>
                <div className='login-element'>
                    <div className='action-elements'>
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
                                <h5>{error.detail}</h5>
                            )
                        }

                        <Link to="#" className='forgot-password'>forgot password</Link>

                        {
                            status === 'loading' && (
                                <div className="login-btn">
                                    <button type="submit">
                                        <Loader />
                                        <span>loading...</span>
                                    </button>
                                </div>
                            )
                        }

                        {
                            status !== 'loading' && (
                                <div className="login-btn">
                                    <button type="submit">login</button>
                                </div>
                            )
                        }

                        <p className='signup-text'>
                            You don't have an account?, <Link to="/signup">create an account now</Link>
                        </p>
                    </div>
                </div>
            </form>
        </>
    );
}
