import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import QuestionFormulaire from "../components/QuestionFormulaire";

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
      <h1>Garden</h1>
      <div>
        {plants.map((plant, i) => (
          <ul key={i} className="plant">
            <div>Common name: {plant.common_name}</div>
            <p></p>
            <div>Scientific name: {plant.scientific_name}</div>
            <p></p>
            <div>Description: {plant.description}</div>
          </ul>
        ))}
      </div>
      <p></p>
      <QuestionFormulaire plants={plants}/>
    </>
  );
}

{
  /* <div className="form-floating">
          <select
            className="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
          >
         
            {plants.map((plant, i) => (
                <>
                <option key={i} className="plant" />
            
                    <option selected>Choose the plant</option>
                    <option defaultValue={1}>{plant.common_name}</option>
        
                </>
            ))}
     
            
          </select>
          <label htmlFor="floatingSelect">Works with selects</label>
        </div> */
}
