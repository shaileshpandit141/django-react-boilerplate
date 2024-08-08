import React, { useState } from 'react';
import './login.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { login } from '../../loginAPI';
import Input from '../input/Input';
import Loader from '../../../../components/common/Loader';


const Login = () => {

    const dispatch = useDispatch();
    const status = useSelector((state) => state.auth.status)
    const error = useSelector((state) => state.auth.error)

    const initialFormData = {
        username: '',
        password: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    function handleFormDataChange(event) {
        const { name, type, chacked, value } = event.target
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === 'checkbox' ? chacked : value
            }
        })
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        dispatch(login(formData));
    };

    if (status === 'succeeded') {
        return <Navigate to='/' />
    }

    if (error) {
        alert(error)
    }

    return (
        <form onSubmit={handleFormSubmit} className='grid-12 login-form'>
            <div className='grid-2-2 login-element'>
                <div className='action-elements'>
                    <h2 className='title'>get started now</h2>
                    <p className='description'>enter your credentials to access your account</p>

                    <Input
                        type='text'
                        label='username'
                        name='username'
                        onChange={handleFormDataChange}
                        value={formData.username}
                    />

                    <Input
                        type='text'
                        label='password'
                        name='password'
                        onChange={handleFormDataChange}
                        value={formData.password}
                    />

                    <Link to="#" className='forgot-password'>forgot password</Link>

                    {status === 'loading'
                        ? (
                            <button className='login-btn' type="submit">
                                <Loader />
                                <span>loading...</span>
                            </button>
                        )
                        : <button className='login-btn' type="submit">login</button>
                    }

                    <p className='register-text'>
                        You don't have an account?, <Link to="/signup">create an account now</Link>
                    </p>
                </div>
            </div>
        </form>
    );
};

export default Login;
