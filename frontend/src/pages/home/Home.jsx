import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userAPI } from '../../features/user/userAPI'

export default function Home() {

    const dispatch = useDispatch()
    const { userInfo, status, error } = useSelector((state) => state.user)

    React.useEffect(() => {
        if (status == "idle") {
            dispatch(userAPI())
        }
    }, [])

    return (
        <div className='grid-12'>
            <section className='grid-2-2'>
                <h2>Welcome to Django React Full Stack Web App</h2>
                <br />
                {status === 'loading' && <h3>Loading...</h3>}
                {status === 'successeded' && <h3>{userInfo.username} {userInfo.email}</h3>}
                {error && <h3>{error}</h3>}
            </section>
        </div>
    )
}
