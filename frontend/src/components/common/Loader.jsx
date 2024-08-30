import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

export default function Loader() {
    return(
        <ThreeDots
            visible={true}
            height="32"
            width="32"
            color="var(--text-primary)"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}
