import React from 'react'
import { useDispatch } from 'react-redux'
import { signout } from '../../slices/signinSlice'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'
import { toast } from 'react-toastify'

export default function SignoutButton({ onClick }) {
  const dispatch = useDispatch()

  const handleSignout = () => {
    toast.success('The sign out request was successful!')
    dispatch(signout())
  }

  return (
    <button
      className='button'
      onClick={() => {
        handleSignout()
        onClick()
      }}
    >
      <span className='icon'>
        <LazyMaterialIcon iconName={icons.signout} />
      </span>
      <span className='label'>
        sign out
      </span>
    </button>
  )
}
