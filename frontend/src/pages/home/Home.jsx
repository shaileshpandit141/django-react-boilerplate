import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser } from '../../features/currentUser/currentUserSlice'

export default function Home() {

    const dispatch = useDispatch()
    const { user, status, error } = useSelector((state) => state.currentUser)

    React.useEffect(() => {
        dispatch(fetchCurrentUser())
    }, [dispatch])

    return (
        <div className='grid-12'>
            <section className='grid-2-2'>
                <h2>Welcome to Django React Full Stack Web App</h2>
                <br />
                {status === 'loading' && <h2>Loading...</h2>}
                {status === 'successeded' && <h3>{user.first_name} {user.last_name} {user.email}</h3>}
                {error && <h2>{error}</h2>}
            </section>
        </div>
    )
}
