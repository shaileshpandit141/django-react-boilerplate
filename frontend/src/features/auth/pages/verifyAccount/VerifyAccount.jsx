import React, { useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import VerifyAccountWrapper from './VerifyAccountWrapper'
import Loader from 'components/common/loader/Loader'
import { LazyMaterialIcon, icons } from 'lazyUtils/LazyMaterialIcon'
import { useDispatch } from 'react-redux'
import { useVerifyAccountSelector } from '../../hooks/useVerifyAccountSelector'
import { verifyAccountThunk } from '../../thunks/verifyAccountThunk'
import { resetVerifyAccountState } from '../../slices/verifyAccountSlice'


export default function VerifyAccount() {
  const dispatch = useDispatch()
  const { key } = useParams()
  const { status, data, error } = useVerifyAccountSelector()

  // Handle submission of form.
  const handleFormSubmit = useCallback((event) => {
    event.preventDefault()
    dispatch(verifyAccountThunk({ key: key }))
  }, [dispatch, key])

  // Rest the State if user is visit page without any action.
  useEffect(() => {
    dispatch(resetVerifyAccountState())
  }, [dispatch])

  // Handle the idle status.
  if (status === 'idle') {
    return (
      <VerifyAccountWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">Click on the Activate button to activate your account</h1>
          {/* activate button */}
          <div className='buttons'>
            <button
              type="submit"
              className="button"
            >
              <span className="label">activate</span>
            </button>
          </div>
        </form>
      </VerifyAccountWrapper>
    )
  }

  // Handle the loading status.
  if (status === 'loading') {
    return (
      <VerifyAccountWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">Click on the Activate button to activate your account</h1>
          {/* activate button as loader */}
          <div className='buttons'>
            <button
              type="submit"
              className="button"
              disabled
            >
              <span className="label">
                <Loader />
              </span>
            </button>
          </div>
        </form>
      </VerifyAccountWrapper>
    )
  }

  // Handle the failed status.
  if (status === 'failed') {
    return (
      <VerifyAccountWrapper>
        <form onSubmit={handleFormSubmit} className='form'>
          <h1 className="title">activation request is failed</h1>
          {/* Error message for key. */}
          {
            error?.key && (
              error.key.map((detail, index) => (
                <p className='error-text' key={index}>{detail}</p>
              ))
            )
          }
          {/* Error message for other. */}
          {
            error?.detail && <p className='message'>{error.detail}</p>
          }
          {/* activate button */}
          <div className='buttons'>
            <button
              type="submit"
              className="button"
              disabled
            >
              <span className="label">activate</span>
            </button>
          </div>
        </form>
      </VerifyAccountWrapper>
    )
  }

  // Handle succeeded status and response data state.
  if (status === 'succeeded' && data) {
    return (
      <VerifyAccountWrapper>
        {/* succeeded images. */}
        {/* <div className='succeeded-img'>
          <img src={imgUrl} alt='email-send-svg' />
        </div> */}
        {/* succeeded information. */}
        <div className='succeeded-info'>
          <h1 className="title">account activation request is successful</h1>
          {
            data?.detail && <p className='message'>{data.detail}</p>
          }
        </div>
        {/* sign in page link. */}
        <div className='buttons'>
          <Link
            to="/signin"
            className="link"
          >
            <span className='icon'>
              <LazyMaterialIcon iconName={icons.signin} />
            </span>
            <span className="label">Sign in</span>
          </Link>
        </div>
      </VerifyAccountWrapper>
    )
  }

  if (status === 'succeeded') {
    return (
      <VerifyAccountWrapper>
        {/* succeeded images. */}
        {/* <div className='succeeded-img'>
            <img src={imgUrl} alt='email-send-svg' />
          </div> */}
        {/* succeeded information. */}
        <div className='succeeded-info'>
          <h1 className="title">account activation request is successful</h1>
          <p className='message'>your account is activated</p>
        </div>
        {/* sign in page link. */}
        <div className='buttons'>
          <Link
            to="/signin"
            className="link"
          >
            <span className='icon'>
              <LazyMaterialIcon iconName={icons.signin} />
            </span>
            <span className="label">Sign in</span>
          </Link>
        </div>
      </VerifyAccountWrapper>
    )
  }
}
