import React from 'react'
import axiosInstance from "../../axiosInstance"

export default function Home() {
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

    const username = localStorage.getItem('first_name') || 'Unknow'

    return (
        <div className='grid-12'>
            <section className='grid-2-2'>
                <span>welcome, </span> <span>{username}</span>
                <br />
                <h4>Message: {data?.message}</h4>
            </section>
        </div>
    )
}
