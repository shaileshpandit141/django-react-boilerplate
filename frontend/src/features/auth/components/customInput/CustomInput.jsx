import React from 'react'
import './CustomInput.scss'

export default function CustomInput(props) {

    const { label, ...rest } = props
    return (
        <div className="input-wrapper">
            <input className='input' id={label} {...rest} required autoComplete="on" placeholder=''/>
            <label className='label' htmlFor={label}>{label || rest.name}</label>
        </div>
    )
}
