import { React, useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/auth";

export default function Navbar() {
    const {logoutUser, isLoggedIn} = useContext(AuthContext);

    let isUserLoggedIn = isLoggedIn
    console.log("Is Logged In", isUserLoggedIn)

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                <img src="/home-icon.jpeg" alt="" width="24" height="24" className="d-inline-block align-text-top me-2" />
                Planty
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                    <Link className="nav-link" to='/plants'>Plants</Link>
                    {isUserLoggedIn && (
                        <Link className="nav-link" to='/garden'>My Garden</Link>
                    )}
                </div>
                </div>
                {!isUserLoggedIn && (
                    <form class="d-flex">
                    <Link className="btn btn-outline-success me-2" to='/login'>Login</Link>
                    <Link className="btn btn-outline-success me-2" to='/signup'>Signup</Link>
                </form>
                )}

                {isUserLoggedIn && (
                    <button className="btn btn-outline-success me-2" onClick={logoutUser}>Logout</button>
                )}
            </div>
        </nav>
    )

}



 