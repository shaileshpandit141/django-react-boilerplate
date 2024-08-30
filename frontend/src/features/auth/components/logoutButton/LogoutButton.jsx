import React from 'react';
import './LogoutButton.scss';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';

export default function LogoutButton() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='button-as-link-wrapper'>
            <button
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

