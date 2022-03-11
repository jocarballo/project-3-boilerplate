import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQueryParam, StringParam } from "use-query-params";
import Navbar from "../components/Navbar";
import PlantCard from "../components/PlantCard";
import { PLANTS_TAB } from "../utilities";



export default function Plants() {
  const [query, setQuery] = useQueryParam("query", StringParam);
  const hasValidQuery = query !== undefined && query !== ""
  console.log("query: ", query);


  const [plants, setPlants] = useState([]);
  console.log("plants here: ", plants);

  // verifying if plant includes query
  let filteredPlants = plants.filter((plant) => {
    if (query === undefined) {
      return true;
    }
    return plant.common_name.toLowerCase().includes(query);
  });
  console.log("filtered plants: ", filteredPlants);
  const storedToken = localStorage.getItem("authToken");

  // get all the plants from the backend / server
  const getAllPlants = () => {
    // request 'api/plants'
    // for every request to a project route we need to also send the token
    axios
      .get("/plants", { headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        //set the state of plants
        setPlants(response.data);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  useEffect(() => {
    getAllPlants();
  }, []);

  return (
    <>
      <Navbar selectedTab={PLANTS_TAB}/>
      <div className="container">
        <div className="row">
          {filteredPlants.map((plant, i) => (
            <PlantCard plant={plant} index={i}/>
          ))}
        </div>
      </div> 
      <div className="ms-4 mt-4">
          { filteredPlants.length === 0 && hasValidQuery &&(
            <h2>There are no plants.</h2>
          )}
        </div>
    </>
  );
}
