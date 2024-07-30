import React, { useState } from 'react'
import './register.scss'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../features/auth/authSlice';

export default function Register() {

    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.access)
    const status = useSelector((state) => state.auth.status)
    const error = useSelector((state) => state.auth.error)

    const initialFormData = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        re_password: '',
    }

    const [formData, setFormData] = useState(initialFormData)

    function handleFormDataChange(event) {
        const { name, type, checked, value } = event.target
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]:type === 'checkbox' ? checked : value
            }
        })
    }

    function handleFormSubmit(event) {
        event.preventDefault()
        if (status === 'idle') {
            dispatch(register(formData))
            setFormData(initialFormData)
        }
    }

    return (
        <form onSubmit={handleFormSubmit} className='register-form'>
            <div className='register-element'>
                <div className='action-elements'>
                    <h2 className='title'>get started now</h2>
                    <p className='description'>enter your credentials to create your account</p>

                    <div className="first-name-element">
                        <input
                            type="text"
                            required
                            name='first_name'
                            onChange={handleFormDataChange}
                            value={formData.first_name}
                        />
                        <label>first name</label>
                    </div>

                    <div className="last-name-element">
                        <input
                            type="text"
                            required
                            name='last_name'
                            onChange={handleFormDataChange}
                            value={formData.last_name}
                        />
                        <label>last name</label>
                    </div>

                    <div className="email-element">
                        <input
                            type="text"
                            required
                            name='email'
                            onChange={handleFormDataChange}
                            value={formData.email}
                        />
                        <label>email</label>
                    </div>

                    <div className="password-element">
                        <input
                            type="text"
                            required
                            name='password'
                            onChange={handleFormDataChange}
                            value={formData.password}
                        />
                        <label>password</label>
                    </div>

                    <div className="re-password-element">
                        <input
                            type="text"
                            required
                            name='re_password'
                            onChange={handleFormDataChange}
                            value={formData.re_password}
                        />
                        <label>re-password</label>
                    </div>

                    {
                        status === 'loading'
                            ? <button className='login-btn' type="submit">loading...</button>
                            : <button className='login-btn' type="submit">register</button>
                    }

                    <p className='login-text'>
                        have an account?, <Link to="/login">login</Link> now
                    </p>
                </div>
            </div>
        </form>
    )
}
