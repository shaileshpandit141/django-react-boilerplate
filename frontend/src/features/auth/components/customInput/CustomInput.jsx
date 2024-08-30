import React, { useState } from 'react'
import './CustomInput.scss'

export default function CustomInput(props) {

    const { name, type, label, ...rest} = props;
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    function handleIsPasswordVisiblity(event) {
        setIsPasswordVisible(prevState => !prevState)
    }

    return (
        <div className="input-wrapper">
            <input
                autoComplete="on"
                className='input'
                type={type === "password" ? (isPasswordVisible ? type : "text") : type}
                name={name}
                required
                placeholder=''
                id={label}
                {...rest}
            />
            <label
                htmlFor={label}
                className='label'
            >
                {label || name}
            </label>
            {
                type === "password" && (
                    <div
                        className="viev-password"
                        onClick={handleIsPasswordVisiblity}
                    >
                        <span className='icon'>
                            <span
                                className={
                                    `material-symbols-outlined ${isPasswordVisible ? "fill" : null}`
                                }
                            >
                                visibility
                            </span>
                        </span>
                    </div>
                )
            }
        </div>
    )
}
