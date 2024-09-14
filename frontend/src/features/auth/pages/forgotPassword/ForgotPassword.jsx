import React from 'react'
import "./ForgotPassword.scss"
import { Helmet } from "react-helmet-async"
import CustomInput from '../../components/customInput/CustomInput'

export default function ForgotPassword() {

    function handleFormSubmit(event) {
        event.preventDefault()
    }

    return (
        <>
            {/* Metadata settings */}
            <Helmet>
                <title>forgot password</title>
            </Helmet>

            {/* Component jsx */}
            <form onSubmit={handleFormSubmit} className='inner-grid-2-2 login-form'>
                <div className='inputes-container'>
                    <h3 className='title'>forgot your password</h3>

                    <CustomInput
                        type='text'
                        label='username'
                        name='username'
                    // onChange={handleFormDataChange}
                    // value={formData.username}
                    />

                    <button
                        type="submit"
                        className='button'
                    // disabled={loginButtonClickCount <= 0 ? true : false}
                    >
                        <span className="label">forgot</span>
                    </button>
                </div>
            </form>
        </>
    )
}
