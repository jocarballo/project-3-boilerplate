import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import QuestionFormulaire from "../components/QuestionFormulaire";
import PlantCard from "../components/PlantCard";
import Navbar from "../components/Navbar";
import { GARDEN_TAB } from "../utilities";

export default function Garden() {
  const [plants, setPlants] = useState([]);
  console.log("garden here: ", plants);

  const storedToken = localStorage.getItem("authToken");

  // get all the plants from the user
  const getAllPlantsFromUser = () => {
    // request 'api/plants'
    // for every request to a project route we need to also send the token
    console.log("Will request user plants");
    axios
      .get("/garden", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        //set the state of garden
        setPlants(response.data);
      })
      .catch((err) => {
        console.log("My error: ", err);
      });
  };

  useEffect(() => {
    getAllPlantsFromUser();
  }, []);

  return (
    <>
      <Navbar selectedTab={GARDEN_TAB} />
      <h1>Garden</h1>
      <div>
        {plants.map((plant, i) => (
          <PlantCard plant={plant} index={i} />
        ))}
      </div>
      <p></p>
      <h1>Notes</h1>
      <div>
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
        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
          ></textarea>
          <label for="floatingTextarea">Leave a note here</label>
        </div>
        <div class="mb-3">
          <label for="formFileSm" class="form-label"></label>
          <input
            class="form-control form-control-sm"
            id="formFileSm"
            type="file"
          />
        </div>
      </div>
    </>
  );
}
