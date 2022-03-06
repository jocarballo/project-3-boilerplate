import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const reqBody = { username, email, password };
    axios
      .post("/signup", reqBody)
      .then((response) => {
        // redirect to login
        navigate("/login");
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <>
      <div className="container">
        <div className="row">
          <div class="col-6" id="signup-content-container">
            <h1>Signup</h1>
            <h3>Start your journey with Planty now</h3>
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
                <label htmlFor="email" class="form-label">
                  Email
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  value={email}
                  onChange={handleEmail}
                />
              </div>
              <div class="mb-3">
                <label htmlFor="password" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="text"
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
                  Signup
                </button>
              </div>
            </form>
                {errorMessage && <h5>{errorMessage}</h5>}
            <p></p>
            <p>
                Already have an account? <Link to='/login'>Login</Link>
            </p>
          </div>
          <div class="col-6 d-flex justify-content-center fill" id="login-banner-container">
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
                <label htmlFor="email">Email:</label>
                <input type="text" value={email} onChange={handleEmail} />
                <label htmlFor="password">Password:</label>
                <input type="text" value={password} onChange={handlePassword} />
                <button type="submit">Sign Up</button>
            </form>

            {errorMessage && <h5>{errorMessage}</h5>}

            <h3>Already have an account?</h3>
            <Link to='/login'>Login</Link> */
}
