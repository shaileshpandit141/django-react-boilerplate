import React, { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSignoutSelector } from 'features/auth/hooks/useSignoutSelector'
import { signoutThunk } from 'features/auth/thunks/signoutThunk'
import { resetSignoutState } from 'features/auth/slices/signoutSlice'
import { resetSigninState } from '../../slices/signinSlice'
import Loader from 'components/common/loader/Loader'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'
import { toast } from 'react-toastify'

export default function SignoutButton({ onClick }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, data, error } = useSignoutSelector()

  const handleSignout = useCallback(() => {
    dispatch(signoutThunk())
    onClick()
  }, [dispatch, onClick])

  // Trigger toast notifications based on the status or error
  useEffect(() => {
    if (status === 'failed') {
      if (error?.refresh_token) {
        for (let message of error.refresh_token) {
          toast.error(message)
        }
      }
      if (error?.invalid_token) {
        for (let message of error.invalid_token) {
          toast.error(message)
        }
      }
    }
    if (status === 'succeeded') {
      toast.success('The sign out request was successful!')
      dispatch(resetSignoutState())
      dispatch(resetSigninState())
      navigate('/signin', { replace: false })
    }
  }, [status, error, navigate, dispatch])

  if (status === 'idle') {
    return (
      <button
        className='button'
        onClick={handleSignout}
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

  if (status === 'loading') {
    return (
      <button
        className='button'
        disabled
      >
        <span className='label'>
          <Loader />
        </span>
      </button>
    )
  }

  if (status === 'failed') {
    return (
      <button
        className='button'
        disabled
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

  if (status === 'succeeded' && data) {
    return (
      <button
        className='button'
        disabled
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

  if (status === 'succeeded') {
    return (
      <button
        className='button'
        disabled
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
}
