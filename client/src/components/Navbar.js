import React from 'react'
import { Link } from 'react-router-dom'



export default function Navbar() {

    return (
        <nav className='navbar'>
            <Link className="nav-login" to='/login'>Login</Link>
            <Link className="nav-signup" to='/signup'>Signup</Link>
        </nav>
    )
}