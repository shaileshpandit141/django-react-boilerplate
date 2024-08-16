import React from 'react'
import { Circles } from 'react-loader-spinner'

export default function Loader() {
    return (
        <Circles
            height="24"
            width="24"
            color="var(--background-light)"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
}
