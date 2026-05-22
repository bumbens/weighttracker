import {FaBars, FaTimes} from 'react-icons/fa'
import Navbar from './Navbar.jsx'
import '../css/Navbar.css'


function Header({user}) {
    if (!user) return

    
    return (
        <div>
            <Navbar />
            
            
        </div>
    )
}

export default Header