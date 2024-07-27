import React from 'react'
import { NavLink } from 'react-router-dom'
import axiosInstance from "../../axiosInstance"
import { logout } from '../../features/auth/authSlice'
import { useDispatch } from 'react-redux'

export default function Home() {
    const dispatch = useDispatch()
    const [data, setData] = React.useState(null)

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('auth/message/');
                console.log(response.data);
                setData(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the function
        fetchData();
    }, [])

    return (
        <div className='grid-12'>
            <section className='grid-2-2'>
                <NavLink to='/login'>Login</NavLink>
                <a href='' onClick={() => dispatch(logout())}>Logout</a>
                <h2>Home</h2>
                <h4>Message: {data?.message}</h4>
            </section>
        </div>
    )
}
