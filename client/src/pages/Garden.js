import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import QuestionFormulaire from "../components/QuestionFormulaire";
import PlantCard from "../components/PlantCard";
import Navbar from "../components/Navbar";



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
        <Navbar />
      <h1>Garden</h1>
      <div>
      {plants.map((plant, i) => (
        <PlantCard plant={plant} index={i}/>
        ))}
      </div>
      <p></p>
      <QuestionFormulaire plants={plants}/>
    </>
  );
}

