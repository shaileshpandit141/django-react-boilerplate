import React from 'react'
import './Header.css'

export default function Header() {
    return (
        <header className='grid--element--center header'>
            <section className='left--container'>
                <figure className="logo--figure--container">
                    <a href="">
                        {/* <img src="" alt="" /> */}
                    </a>
                </figure>
                <h3 className='logo--title'>
                    {/* Logo Title  */}
                </h3>
            </section>
            <section>
                center
            </section>
            <section>
                right
            </section>
        </header>
    )
}
