import React, { useState } from 'react';
import './login.css'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../../../features/auth/authSlice';
import { useSelector } from 'react-redux';


const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    const accessToken = useSelector((state) => state.auth.access);

    // if (accessToken) {
    //     return <Navigate to='/' />
    // }

    return (
        <form onSubmit={handleSubmit} className='grid-12 login-form'>
            <div className='grid-2-2 login-element'>
                <div className='action-elements'>
                    <div className="email-element">
                        <input
                            type="text"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>email</label>
                    </div>

                    <div className="password-element">
                        <input
                            type="text"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>password</label>
                    </div>
                    <button className='login-btn' type="submit">Login</button>
                </div>
            </div>
        </form>
    );
};

export default Login;
