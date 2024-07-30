import React, { useState } from 'react';
import './login.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { login } from '../../../features/auth/authSlice';


const Login = () => {

    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.access)
    const status = useSelector((state) => state.auth.status)
    const error = useSelector((state) => state.auth.error)

    const initialFormData = {
        email: '',
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
        if (status === 'idle') {
            dispatch(login(formData));
            setFormData(initialFormData)
        }
    };

    if (accessToken) {
        return <Navigate to='/' />
    }

    return (
        <form onSubmit={handleFormSubmit} className='grid-12 login-form'>
            <div className='grid-2-2 login-element'>
                <div className='action-elements'>
                    <h2 className='title'>get started now</h2>
                    <p className='description'>enter your credentials to access your account</p>
                    <div className="email-element">
                        <input
                            type="text"
                            required
                            name='email'
                            value={formData.email}
                            onChange={handleFormDataChange}
                            style={error ? {'border-color': 'red'}: {}}
                        />
                        <label>email</label>
                    </div>
                    <div className="password-element">
                        <input
                            type="text"
                            required
                            name='password'
                            value={formData.password}
                            onChange={handleFormDataChange}
                        />
                        <label>password</label>
                    </div>
                    <Link to="#" className='forgot-password'>forgot password</Link>
                    {
                        status === 'loading'
                            ? <button className='login-btn' type="submit">loading...</button>
                            : <button className='login-btn' type="submit">login</button>
                    }

                    <p className='register-text'>
                        You don't have an account?, <Link to="/register">create</Link> an account now
                    </p>
                </div>
            </div>
        </form>
    );
};

export default Login;
