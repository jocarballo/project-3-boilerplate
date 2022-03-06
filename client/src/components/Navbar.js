import React from 'react'
import { Link } from 'react-router-dom'



export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                <img src="/home-icon.jpeg" alt="" width="30" height="24" className="d-inline-block align-text-top" />
                Planty
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                    <Link className="nav-link" to='/plants'>Plants</Link>
                </div>
                </div>
            </div>
        </nav>
    )
}

{/* <nav className='navbar'>
            <img className="nav-logo" src="../homepage.png" alt="img from logo" /> 
            //<div>PLANTY</div>
            //<Link className="nav-home" to='/'>Home</Link>
           // <Link className="nav-plants" to='/plants'>Plants</Link>
           // <Link className="nav-login" to='/login'>Login</Link>
           // <Link className="nav-signup" to='/signup'>Signup</Link>
       // </nav> */}



 