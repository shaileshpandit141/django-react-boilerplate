import React from 'react'
import './CustomInput.scss'

export default function CustomInput(props) {

    const { label, ...rest } = props
    return (
        <div className="input-wrapper">
            <input className='input' {...rest} required autoComplete="on" placeholder=''/>
            <label className='label'>{label || rest.name}</label>
        </div>
    )
}
