import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import notesImg from '../../assets/images/logo.png'


function NavElements(props) {
    return (
        <nav className="links-container">
            <div className="protect-overflow">
                <NavLink to="#" onClick={props.handelSideBar}>Link 1</NavLink>
            </div>
            <div className="protect-overflow">
                <NavLink to="#" onClick={props.handelSideBar}>Link 2</NavLink>
            </div>
            <div className="protect-overflow">
                <NavLink to="#" onClick={props.handelSideBar}>Login</NavLink>
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
            <header className='grid-element-center header'>
                <section className='left-container'>
                    <NavLink to="#" className="logo-link">
                        <div className="logo-dot"></div>
                        <h3 className='logo-text'>Logo</h3>
                    </NavLink>
                </section>
                <section>
                    {/* center */}
                </section>
                <section className='right-container'>
                    {/* Insert nav Elements here  */}
                    <NavElements />
                    <div className="menu-container">
                        <div onClick={handelSideBar} className='menu'>
                            <div className={`menu-line ${sideBarState && 'active-0 active-1 active-2'}`}></div>
                        </div>
                    </div>
                </section>
            </header>
            <div className={`small-menu-container ${sideBarState && 'active-small-menu'}`}>
                {/* Also insert nav Elements here  */}
                <NavElements handelSideBar={handelSideBar} />
            </div>
        </>
    )
}
