import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import axios, { Axios } from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, verifyStoredToken } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqBody = { username, password };
    axios
      .post("/login", reqBody)
      .then((response) => {
        //redirecting to home
        console.log("I have a token cuties");
        const token = response.data.authToken;
        // store the token
        storeToken(token);
        verifyStoredToken();
      })
      .then(() => {
        axios.post("/basket");
      })
      .then(() => {
        // redirect to home
        navigate("/");
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleUsername = (e) => setUsername(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <>
      <div className="container">
        <div className="row">
          <div class="col-6" id="login-content-container">
            <h1>Login</h1>
            <h2>Enter your plant paradise</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={handleUsername}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  aria-describedby="passwordHelp"
                  value={password}
                  onChange={handlePassword}
                />
                <div class="col-auto">
                  <span id="passwordHelpInline" class="form-text">
                    Must be at least 4 characters (we'll never share your
                    password with anyone else).
                  </span>
                </div>
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-outline-success btn-block"
                >
                  Login
                </button>
              </div>
            </form>
            {errorMessage && <h5>{errorMessage}</h5>}
            <p></p>
            <p>
              Need a Planty account? <Link to="/signup">Signup</Link>
            </p>
          </div>
          <div
            className="col-6 d-flex justify-content-center fill"
            id="login-banner-container"
          >
            <img id="login-banner-image" src="monstera_leaf.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
