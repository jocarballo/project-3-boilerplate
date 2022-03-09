import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { HOME_TAB } from "../utilities";
import { PLANTS_TAB } from "../utilities";
import { GARDEN_TAB } from "../utilities";
import { ASK_A_BOTANIC_TAB } from "../utilities";

export default function Navbar(props) {
  const { logoutUser, isLoggedIn } = useContext(AuthContext);

  const selectedTab = props.selectedTab;
  let tabClasses = {};
  tabClasses[HOME_TAB] = "nav-link";
  tabClasses[PLANTS_TAB] = "nav-link";
  tabClasses[GARDEN_TAB] = "nav-link";
  tabClasses[ASK_A_BOTANIC_TAB] = "nav-link";

  tabClasses[selectedTab] = "nav-link active";

  let isUserLoggedIn = isLoggedIn;
  console.log("Is Logged In", isUserLoggedIn);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="/home-icon.jpeg"
            alt=""
            width="24"
            height="24"
            className="d-inline-block align-text-top me-2"
          />
          Planty
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className={tabClasses[HOME_TAB]} aria-current="page" to="/">
              Home
            </Link>
            <Link className={tabClasses[PLANTS_TAB]} to="/plants">
              Plants
            </Link>
            {isUserLoggedIn && (
              <>
                <Link className={tabClasses[GARDEN_TAB]} to="/garden">
                  My Garden
                </Link>
                <Link className={tabClasses[ASK_A_BOTANIC_TAB]} to="/question">
                  Ask a Botanic
                </Link>
              </>
            )}
          </div>
        </div>
        {!isUserLoggedIn && (
          <form className="d-flex">
            <Link className="btn btn-outline-success me-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline-success me-2" to="/signup">
              Signup
            </Link>
          </form>
        )}

        {isUserLoggedIn && (
          <button
            className="btn btn-outline-success me-2 "
            onClick={logoutUser}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
