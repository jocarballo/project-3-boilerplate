import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import axios from "axios";

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
        verifyStoredToken().then(() => {
          // redirect to home
          navigate("/");
        });
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
      <div class="container">
        <div class="row">
          <div class="col-6" id="login-content-container">
            <h1>Login</h1>
            <h2>Enter your plant paradise</h2>
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label htmlFor="username" class="form-label">
                  Username
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  value={username}
                  onChange={handleUsername}
                />
              </div>
              <div class="mb-3">
                <label htmlFor="password" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  aria-describedby="passwordHelp"
                  value={password}
                  onChange={handlePassword}
                />
                <div id="passwordHelp" class="form-text">
                  We'll never share your password with anyone else.
                </div>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-outline-success btn-block">
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
            class="col-6 d-flex justify-content-center fill"
            id="login-banner-container"
          >
            <img id="login-banner-image" src="monstera_leaf.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input type="text" value={username} onChange={handleUsername} />
              <label htmlFor="password">Password:</label>
              <input type="text" value={password} onChange={handlePassword} />
              <button type="submit">Log In</button>
            </form> */
}
