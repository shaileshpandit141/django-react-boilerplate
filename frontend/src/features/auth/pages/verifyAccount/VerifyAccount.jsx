import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useVerifyAccountSelector } from '../../hooks/useVerifyAccountSelector';
import { verifyAccountThunk } from '../../thunks/verifyAccountThunk';
import "./VerifyAccount.scss";

export default function VerifyAccount() {

    const { key } = useParams();
    const dispatch = useDispatch()
    const { error, status } = useVerifyAccountSelector()

    function handleVerifyButtonClick(event) {
        event.preventDefault()
        if (status === "idle") {
            dispatch(verifyAccountThunk({ key: key }))
        }
    }

    if (status === "succeeded") {
        return <Navigate to="/login" />
    }

    return (
        <>
            {/* Metadata settings */}
            <Helmet>

            </Helmet>

            {/* Component jsx */}
            <div className='grid'>
                <div className='inner-grid'>
                    {
                        !error && (
                            <>
                                <h3 className='title'>Verify your account.</h3>
                                <div className="button-wrapper">
                                    <div className='button-wrapper'>
                                        <button onClick={handleVerifyButtonClick}>
                                            <span className='title'>verify</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        error && (
                            <>
                                <h2>{error.detail}</h2>
                                <p>That means verification key is allready used.</p>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}
