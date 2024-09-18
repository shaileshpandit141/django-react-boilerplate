import React from 'react' 
import './LogoutButton.scss' 
import { useDispatch } from 'react-redux' 
import { logout } from '../../slices/authSlice' 
import { LazyMaterialIcon, icons } from '../../../../assets/lazyMaterialIcon/LazyMaterialIcon'

export default function LogoutButton({onClick}) {
    const dispatch = useDispatch() 

    const handleLogout = () => {
        dispatch(logout()) 
    } 

    return (
        <button
            className='button'
            onClick={() => {
                handleLogout()
                onClick()
            }}
        >
            <span className='icon'>
                <LazyMaterialIcon iconName={icons.Logout} />
            </span>
            <span className='label'>
                Logout
            </span>
        </button>
    ) 
} 

