import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import notesImg from '../../assets/images/logo.svg'


function NavElements() {
    return (
        <nav className="links--container">
            <div className="protect--overflow">
                <NavLink to="#">Link 1</NavLink>
            </div>
            <div className="protect--overflow">
                <NavLink to="#">Link 2</NavLink>
            </div>
            <div className="protect--overflow">
                <NavLink to="#">Login</NavLink>
            </div>
        </nav>
    )
}


export default function Header() {


    const [sideBarState, setSideBarState] = React.useState(false)

    function handelSideBar() {
        setSideBarState(prevState => !prevState)
    }


    return (
        <>
            <header className='grid--element--center header'>
                <section className='left--container'>
                    <figure className="logo--figure--container">
                        <NavLink to="#">
                            <img src={notesImg} alt="Img" />
                        </NavLink>
                    </figure>
                    <h3 className='logo--title'>
                        <span>Logo</span>
                        <span>Title</span>
                    </h3>
                </section>
                <section>
                    center
                </section>
                <section className='right--container'>
                    {/* Insert nav Elements here  */}
                    <NavElements />
                    <div className="menu--container">
                        <div onClick={handelSideBar} className='menu'>
                            <div className={`menu--line ${sideBarState && 'active--0 active--1 active--2'}`}></div>
                        </div>
                    </div>
                </section>
            </header>
            <div className={`small--menu--container ${sideBarState && 'active--small--menu'}`}>
                {/* Also insert nav Elements here  */}
                <NavElements />
            </div>
        </>
    )
}
