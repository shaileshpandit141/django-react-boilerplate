import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyAccount } from '../../thunks/verifyAccountThunk';
import useVerifyAccountSelector from '../../hooks/useVerifyAccountSelector';
import "./VerifyAccount.scss";

export default function VerifyAccount() {

    const { key } = useParams();
    const dispatch = useDispatch()
    const { error, status } = useVerifyAccountSelector()

    function handleVerifyButtonClick(event) {
        event.preventDefault()
        if (status === "idle") {
            dispatch(verifyAccount({ key: key }))
        }
    }

    if (status === "succeeded") {
        return <Navigate to="/login" />
    }

    return (
        <div className='grid'>
            <div className='inner-grid'>
                {
                    !error && (
                        <>
                            <h2>Verify your account.</h2>
                            <div className="button-wrapper">
                                <button onClick={handleVerifyButtonClick}>Verify</button>
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
    )
}
