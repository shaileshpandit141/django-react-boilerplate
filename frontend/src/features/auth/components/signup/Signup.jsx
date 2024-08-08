import React, { useState } from 'react'
import './signup.scss'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signupAPI } from '../../signupAPI';
import Input from '../input/Input';
import Loader from '../../../../components/common/Loader';

export default function Signup() {

    const dispatch = useDispatch();
    const status = useSelector((state) => state.auth.status)
    const error = useSelector((state) => state.auth.error)

    const initialFormData = {
        username: '',
        email: '',
        password1: '',
        password2: '',
    }

    const [formData, setFormData] = useState(initialFormData)

    function handleFormDataChange(event) {
        const { name, type, checked, value } = event.target
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === 'checkbox' ? checked : value
            }
        })
    }

    function handleFormSubmit(event) {
        event.preventDefault()
        dispatch(signupAPI(formData))
    }

    if (status === 'succeeded') {
        return <Navigate to='/login' />
    }

    return (
        <form onSubmit={handleFormSubmit} className='register-form'>
            <div className='register-element'>
                <div className='action-elements'>
                    <h2 className='title'>get started now</h2>
                    <p className='description'>enter your credentials to create your account</p>

                    <Input
                        type='text'
                        label='username'
                        name='username'
                        onChange={handleFormDataChange}
                        value={formData.username}
                    />

                    <Input
                        type='text'
                        label='email'
                        name='email'
                        onChange={handleFormDataChange}
                        value={formData.email}
                    />

                    <Input
                        type='text'
                        label='password'
                        name='password1'
                        onChange={handleFormDataChange}
                        value={formData.password1}
                    />

                    <Input
                        type='text'
                        label='confirm password'
                        name='password2'
                        onChange={handleFormDataChange}
                        value={formData.password2}
                    />

                    {
                        status === 'loading'
                            ? (
                                <button className='login-btn' type="submit">
                                    <Loader />
                                    <span>loading...</span>
                                </button>
                            )
                            : <button className='login-btn' type="submit">signup</button>
                    }

                    <p className='login-text'>
                        have an account?, <Link to="/login">login now</Link>
                    </p>
                </div>
            </div>
        </form>
    )
}
