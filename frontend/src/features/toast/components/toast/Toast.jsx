// ToastNotification.js
import React, { useState, useEffect } from 'react';
import './toast.scss';
import checkCircleIcon from '../../../../assets/icons/check_circle_icon.svg';
import closeIcon from '../../../../assets/icons/close_icon.svg';
import { useDispatch } from 'react-redux';
import { closeNotify } from '../../toastSlice';
import useToastSelectors from '../../useToastSelectors';

export default function Toast() {
    const dispatch = useDispatch()

    const { type, title, description, state, displayTime } = useToastSelectors()
    const [timeOutId, setTimeOutId] = useState(undefined);

    useEffect(() => {
        clearTimeout(timeOutId);
        let id = setTimeout(() => {
            dispatch(closeNotify());
        }, displayTime)
        setTimeOutId(() => id)
    }, [state]);

    function handleCloseButtonClick() {
        dispatch(closeNotify());
    }

    return (
        <div className={`toast-notification-grid ${state && "toast-notification-on"}`}>
            <div className='toast-notification-wrapper'>
                <div className='toast-notification '>
                    <div className='left'>
                        <figure className='icon-info'>
                            <img src={checkCircleIcon} alt="check-circle-icon" />
                        </figure>
                    </div>
                    <div className="centre">
                        <h5 className='title'>{title}</h5>
                        {
                            description && <p>{description}</p>
                        }
                    </div>
                    <div className='right'>
                        <figure onClick={handleCloseButtonClick} className='close-icon'>
                            <img src={closeIcon} alt="close-icon" />
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    );
}

