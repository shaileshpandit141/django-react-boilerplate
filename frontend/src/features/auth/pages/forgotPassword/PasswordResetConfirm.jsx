import React from 'react'
import "./ForgotPassword.scss"
import { useParams } from 'react-router-dom'
import { Helmet } from "react-helmet-async"
import CustomInput from '../../components/customInput/CustomInput'

export default function PasswordResetConfirm() {

    const { uid, token } = useParams()

    console.log(uid);
    console.log(token);

    function handleFormSubmit(event) {
        event.preventDefault()
    }

    return (
        <>
            {/* Metadata settings */}
            <Helmet>
                <title>Enter new password</title>
            </Helmet>

            {/* Component jsx */}
            <form onSubmit={handleFormSubmit} className='inner-grid-2-2 forgot-form'>
                <div className='inputes-container'>
                    <h3 className='title'>Enter new password</h3>

                    <CustomInput
                        type='password'
                        label='password'
                        name='new_password1'
                    // onChange={handleFormDataChange}
                    // value={formData.username}
                    />

                    <CustomInput
                        type='password'
                        label='confirm password'
                        name='new_password2'
                    // onChange={handleFormDataChange}
                    // value={formData.username}
                    />

                    <button
                        type="submit"
                        className='button'
                    // disabled={loginButtonClickCount <= 0 ? true : false}
                    >
                        <span className="label">Confirm</span>
                    </button>
                </div>
            </form>
        </>
    )
}
