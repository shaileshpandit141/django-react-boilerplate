import React, { useState } from 'react'
import './CustomInput.scss'
import { LazyMaterialIcon, icons } from '../../../../assets/lazyMaterialIcon/LazyMaterialIcon'

export default function CustomInput(props) {

    const { name, type, label, ...rest } = props
    const [isPasswordVisible, setIsPasswordVisible] = useState(true)

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
                    <button
                        type='button'
                        className="button-as-icon viev-password"
                        onClick={handleIsPasswordVisiblity}
                    >
                        <span className='icon'>
                            {
                                isPasswordVisible ? (
                                    <LazyMaterialIcon iconName={icons.EyeClose} />
                                ) : (
                                    <LazyMaterialIcon iconName={icons.EyeOpen} />
                                )
                            }
                        </span>
                    </button>
                )
            }
        </div>
    )
}
