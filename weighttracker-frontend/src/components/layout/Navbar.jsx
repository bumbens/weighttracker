import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'
import AddMeasurement from '../user/AddMeasurement.jsx'

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => setIsOpen(!isOpen)

    const logout = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    }

    return (
        <div className='navbar'>
            <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                <li className='nav-item'><Link to='/' onClick={toggle}>Home</Link></li>
                <li className='nav-item'><Link to='/measurements' onClick={toggle}>Your measurements</Link></li>
                <li className='nav-item'><Link to='/profile' onClick={toggle}>Profile</Link></li>
                <li className='nav-item'><Link to='/' onClick={logout}>Logout</Link></li>
            </ul>
            <div className='hamburger' onClick={toggle}>
                {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </div>
        </div>
    )
}

export default Navbar