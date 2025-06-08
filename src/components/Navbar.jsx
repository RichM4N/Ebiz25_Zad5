import { useState, useEffect } from 'react'
import { Link} from 'react-router-dom';
import './Navbar.css'

function Navbar(){

    return(
        <nav className="navbarContainer">
            <div className="navbarButton"><Link to="/">Home</Link></div>
            <div className="navbarButton"><Link to="/products">Products</Link></div>
            <div className="navbarButton"><Link to="/cart">Cart</Link></div>
        </nav>
    );

}

export default Navbar;