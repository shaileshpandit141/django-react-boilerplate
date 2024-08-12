import React from 'react';
import './logout.scss';
import { useDispatch } from 'react-redux';
import { logout } from '../../authSlice';

export default function Logout() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='button-as-link-wrapper'>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

