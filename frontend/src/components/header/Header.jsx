import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'


function NavElements(props) {
    return (
        <nav className="links-container">
            <div className="protect-overflow">
                <NavLink to="#" >Link 1</NavLink>
            </div>
            <div className="protect-overflow">
                <NavLink to="#" >Link 2</NavLink>
            </div>
            <div className="protect-overflow">
                <NavLink to="#" >Login</NavLink>
            </div>
        </nav>
    )
}


export default function Header() {

    const [closeSidebarState, setCloseSidebarState] = React.useState(false)

    function handelSideBar() {
        setCloseSidebarState(true)
    }

    function closeSidebar() {
        setCloseSidebarState(false)
    }

    return (
        <>
            <header className='grid-column-2-2 header'>
                <section className='left-container'>
                    <NavLink to="#" className="logo-link">
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
                            <div className="menu-line"></div>
                        </div>
                    </div>
                </section>
            </header>
            <div onClick={closeSidebar} className={`${closeSidebarState && 'bg-sidebar'}`}></div>
            <div className={`small-menu-container ${closeSidebarState && 'active-small-menu'}`}>
                {/* Also insert nav Elements here  */}
                <div className="menu-container">
                    <div onClick={closeSidebar} className='menu'>
                        <div className="menu-line active-0 active-1 active-2"></div>
                    </div>
                </div>
                <NavElements />
            </div>
        </>
    )
}
