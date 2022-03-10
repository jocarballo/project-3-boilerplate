import { React, useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { HOME_TAB } from "../utilities";
import { PLANTS_TAB } from "../utilities";
import { GARDEN_TAB } from "../utilities";
import { ASK_A_BOTANIC_TAB } from "../utilities";
import { EVENTS_TAB } from "../utilities";

import axios from "axios";

export default function Navbar(props) {
  const { logoutUser, isLoggedIn } = useContext(AuthContext);

  const selectedTab = props.selectedTab;
  let tabClasses = {};
  tabClasses[HOME_TAB] = "nav-link";
  tabClasses[PLANTS_TAB] = "nav-link";
  tabClasses[GARDEN_TAB] = "nav-link";
  tabClasses[ASK_A_BOTANIC_TAB] = "nav-link";
  tabClasses[EVENTS_TAB] = "nav-link";

  tabClasses[selectedTab] = "nav-link active";

  let isUserLoggedIn = isLoggedIn;

  const [basketCounter, setBasketCounter] = useState(0);

  if (
    props.basketCounter !== undefined &&
    props.basketCounter !== basketCounter
  ) {
    setBasketCounter(props.basketCounter);
  }

  // get the plants from basket
  useEffect(() => {
    axios
      .get("/basket")
      .then((response) => {
        console.log("basket here:", response.data);
        setBasketCounter(response.data.plants.length);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="/images/home_page.png"
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
            <Link className={tabClasses[EVENTS_TAB]} to="/events">
              Events
            </Link>
            {isUserLoggedIn && (
              <>
                <Link className={tabClasses[GARDEN_TAB]} to="/garden">
                  My Garden
                </Link>
                <Link className={tabClasses[ASK_A_BOTANIC_TAB]} to="/question">
                  Ask a Botanic
                </Link>
                <div>
                  <img
                    src="/images/cart.png"
                    alt=""
                    width="24"
                    height="24"
                    className="d-inline-block align-text-top me-2 cart-image"
                  />
                </div>
                <span className="position-absolute top-2 start-150 translate-middle badge rounded-pill bg-danger badge-cart">
                  {basketCounter}
                </span>
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
