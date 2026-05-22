import {FaBars, FaTimes} from 'react-icons/fa'
import Navbar from './Navbar.jsx'
import '../css/Navbar.css'


function Header({user}) {
    if (!user) return

    
    return (
        <div>
            <Navbar />
            <h1>Hello {user.name}</h1>
            <h3>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
            
        </div>
    )
}

export default Header