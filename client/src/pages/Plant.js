import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";


const Plant = () => {
  const { plantId } = useParams();

  const [plant, setPlant] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    //fetch the data
    axios
      .get(`/plants/${plantId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setPlant(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-4" style={{ background: "#fac400" }}>
            <img
              src={`/images/plants/${plant.image}.png`}
              alt="..."
              className="plant-image"
            />
          </div>
          <div className="col" style={{ background: "#DFF6FF" }}>
            <div className="container">
              <div className="row plant-title">
                <div>{plant.common_name}</div>
              </div>
              <div className="row">
                <div>{plant.scientific_name}</div>
              </div>
              <div className="row">
                <div>{plant.description}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <div>{plant.common_name}</div>
                <div>{plant.scientific_name}</div>
                <div>{plant.description}</div> */
}

export default Plant;
