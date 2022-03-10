import React, { useState, useEffect } from "react";
import axios from "axios";
import { ASK_A_BOTANIC_TAB } from "../utilities";
import Navbar from "../components/Navbar";

export default function QuestionFormulaire(props) {
  const [question, setQuestion] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [title, setTitle] = useState("");

  const [plants, setPlants] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`/plants`)
      .then((response) => {
        console.log(response.data);
        setPlants(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //var selectedValue = element.options[element.selectedIndex].value;

  const handleSubmit = (e) => {
    e.preventDefault();
    const element = e.target[0];
    var selectedPlant = element.options[element.selectedIndex].value;

    const messageElement = e.target[1];
    const message = messageElement.value;

    const reqBody = {
      plant: selectedPlant,
      message: message,
    };

    axios
      .post("/questions", reqBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("This question was created!");
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleTitle = (e) => setTitle(e.target.value);

  return (
    <>
      <Navbar selectedTab={ASK_A_BOTANIC_TAB} />
      <div className="container">
        <div className="row">
          <div className="col-6" id="login-content-container">
            <div>
              <h4 className="question-garden-title">
                If you want to make a question to our Botanic, do it here 🌱
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    aria-label="Floating label select example"
                    style={({ height: 100 }, { width: 520 })}
                  >
                    <option defaultValue>Choose your plant</option>
                    {plants.map((plant, i) => (
                      <option defaultValue={i}>{plant.common_name}</option>
                    ))}
                  </select>
                  <label htmlFor="floatingSelect">Plant</label>
                </div>
                <p></p>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label" >
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Write a title here"
                    id="title"
                    value={title}
                    onChange={handleTitle}
                    style={({ height: 100 }, { width: 520 })}

                  />
                </div>
                <label htmlFor="question" className="form-label">
                  Message
                </label>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Write your question here"
                    id="floatingTextarea2"
                    style={({ height: 100 }, { width: 520 })}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">
                    Write your question here:
                  </label>
                </div>
                <p></p>
                <div class="d-grid">
                  <button
                    type="submit"
                    class="btn btn-outline-success btn-block"
                    style={({ height: 100 }, { width: 520 })}
                  >
                    Send to botanic
                  </button>
                </div>
              </form>
            </div>
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

{
  /* <div>
      <Navbar selectedTab={ASK_A_BOTANIC_TAB} />
      <div className="botanic-formulaire rounded-3">
        <h4 className="question-garden-title">
          If you want to make a question to our Botanic, you can do it here 🌱
        </h4>
        <div className="form-floating">
          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            style={({ height: 100 }, { width: 500 })}
          >
            <option defaultValue>Choose your plant</option>
            {plants.map((plant, i) => (
              <option defaultValue={i}>{plant.common_name}</option>
            ))}
          </select>
          <label htmlFor="floatingSelect">Works with selects</label>
        </div>
        <p></p>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Write your question here"
            id="floatingTextarea2"
            style={({ height: 100 }, { width: 500 })}
          ></textarea>
          <label htmlFor="floatingTextarea2">Write your question here:</label>
        </div>
        <p></p>
        <div class="d-grid">
          <button type="submit" class="btn btn-outline-success btn-block">
            Send to botanic
          </button>
        </div>
      </div>
    </div> */
}
