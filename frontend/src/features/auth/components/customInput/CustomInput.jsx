import React from 'react'
import './CustomInput.scss'

export default function CustomInput(props) {

    const { label, ...rest } = props
    return (
        <div className="input-wrapper">
            <input {...rest} required autoComplete="on" />
            <label>{label || rest.name}</label>
        </div>
    )
}
