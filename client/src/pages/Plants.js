import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQueryParam, StringParam } from "use-query-params";
import Navbar from "../components/Navbar";

export default function Plants() {
  const [query, setQuery] = useQueryParam("query", StringParam);
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
      <Navbar />
      <h1>Here you can see all the plants</h1>
      <div className="container">
        <div className="row">
          {filteredPlants.map((plant, i) => (
            <div className="col-3 mt-4">
              <Link className="link" to={`/plants/${plant._id}`}>
                <div
                  className="plant-card shadow rounded"
                >
                  <div className="img-container d-flex justify-content-center align-items-center">
                    <img
                      src={`images/plants/${plant.image}.png`}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>

                  <div
                    className="card-body rounded-top rounded-4"
                    style={{ background: "white" }}
                  >
                    <h5 className="card-title">{plant.common_name}</h5>
                    <p className="card-text">{plant.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
