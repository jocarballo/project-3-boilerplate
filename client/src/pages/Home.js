import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let query = "";

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/plants?query=${query}`;
    navigate(path);
  };

  // accessing query (value)
  const queryChanged = (event) => {
    console.log(event.target.value);
    query = event.target.value;
  };

  return (
    <>
      <Navbar />
      <div className="container home-container">
        <div className="row">
          <div className="col home-container-left">
            <h1 className="title">Start your plant journey here.</h1>
            <div className="home-container-subtitle">
              Planty is the perfect way to keep track of your plnats and build
              your garden
            </div>
            <div>
              <div class="input-group rounded d-flex align-items-center mt-4">
                <input
                  type="search"
                  class="form-control rounded me-2"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  onChange={queryChanged}
                />
                <button
                  type="button"
                  class="btn btn-outline-secondary rounded-circle"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                    onClick={routeChange}
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-end m-0 p-0">
            <img
              src="/images/homepage_plant.png"
              alt="..."
              className="homepage-image"
            />
          </div>
        </div>
      </div>
    </>
  );
}