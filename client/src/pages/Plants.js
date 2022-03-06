import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQueryParam, StringParam } from "use-query-params";

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
      <h1>Here you can see all the plants</h1>
      <ul>
        {filteredPlants.map((plant, i) => (
          <li>
            <div className="card" style={{background: '#fac400'}}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body" style={{background: 'white'}}>
                <h5 className="card-title">{plant.common_name}</h5>
                <p className="card-text">
                  {plant.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

{
  /* <div className="allPlants">
  {filteredPlants.map((plant, i) => (
    <ul key={i} className="plant">
      <div>Common Name: {plant.common_name}</div>
      <Link to={`/plants/${plant._id}`}>Details</Link>
    </ul>
  ))}
</div>; */
}
