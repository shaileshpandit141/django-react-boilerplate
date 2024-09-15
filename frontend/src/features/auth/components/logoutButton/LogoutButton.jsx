import React from 'react' 
import './LogoutButton.scss' 
import { useDispatch } from 'react-redux' 
import { logout } from '../../slices/authSlice' 

export default function LogoutButton() {
    const dispatch = useDispatch() 

    const handleLogout = () => {
        dispatch(logout()) 
    } 

    return (
        <button
            className='button'
            onClick={handleLogout}
        >
            <span className='icon'>
                <span className="material-symbols-outlined">
                    logout
                </span>
            </span>
            <span className='label'>
                Logout
            </span>
        </button>
    ) 
} 

