import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

export default function Loader() {
    return (
        <RotatingLines
            visible={true}
            height="24"
            width="24"
            color="#2c3e50"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}
