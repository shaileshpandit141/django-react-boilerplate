import React from 'react' 
import './SignoutButton.scss' 
import { useDispatch } from 'react-redux' 
import { signout } from '../../slices/signinSlice' 
import { LazyMaterialIcon, icons } from '../../../../assets/lazyMaterialIcon/LazyMaterialIcon'

export default function SignoutButton({onClick}) {
    const dispatch = useDispatch() 

    const handleLogout = () => {
        dispatch(signout()) 
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
                <LazyMaterialIcon iconName={icons.Signout} />
            </span>
            <span className='label'>
                sign out
            </span>
        </button>
    ) 
} 

