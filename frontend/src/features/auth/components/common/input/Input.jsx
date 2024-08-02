import React from 'react'
import './input.scss'

export default function Input(props) {

    const { label, ...rest } = props
    return (
        <div className="input-wrapper">
            <input {...rest} required />
            <label>{label || rest.name}</label>
        </div>
    )
}
