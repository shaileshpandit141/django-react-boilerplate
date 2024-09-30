// Named Imports.
import React, { useEffect } from 'react'
import './Home.scss'
import { useDispatch } from 'react-redux'
import { userThunk, useUserSelectors } from 'features/user'


export default function Home() {

  const dispatch = useDispatch()
  const { status, data, error } = useUserSelectors()

  useEffect(() => {
    if (status === "idle") {
      dispatch(userThunk())
    }
  }, [dispatch, status])

  return (
    <section className='inner-grid-2-2 home-page'>
      <h1>Welcome to building robust UI's</h1>
      <br />
      {status === 'loading' && <h3>Loading...</h3>}
      {status === 'succeeded' && <h3>{data?.username} {data?.email}</h3>}
      {error && <h3>{error}</h3>}
      <br />
      <p>
        This boilerplate includes all the necessary setup for building robust UI's
        using React With Django and Django Rest Framework.
      </p>
    </section>
  )
}
