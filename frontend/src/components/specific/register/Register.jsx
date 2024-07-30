import React from 'react'
import './register.scss'
import { Link } from 'react-router-dom'

export default function Register() {
    return (
        <form className='register-form'>
            <div className='register-element'>
                <div className='action-elements'>
                    <h2 className='title'>get started now</h2>
                    <p className='description'>enter your credentials to create your account</p>

                    <div className="first-name-element">
                        <input
                            type="text"
                            required
                        />
                        <label>first-name</label>
                    </div>

                    <div className="last-name-element">
                        <input
                            type="text"
                            required
                        />
                        <label>last-name</label>
                    </div>

                    <div className="email-element">
                        <input
                            type="text"
                            required
                        />
                        <label>email</label>
                    </div>

                    <div className="password-element">
                        <input
                            type="text"
                            required
                        />
                        <label>password</label>
                    </div>

                    <div className="re-password-element">
                        <input
                            type="text"
                            required
                        />
                        <label>re-password</label>
                    </div>

                    <button className='login-btn' type="submit">register</button>

                    <p className='login-text'>
                        have an account?, <Link to="/login">login</Link> now
                    </p>
                </div>
            </div>
        </form>
    )
}
