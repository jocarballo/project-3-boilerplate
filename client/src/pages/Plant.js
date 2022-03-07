import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PlantCharacteristics from "../components/PlantCharacteristics";

const Plant = () => {
  const { plantId } = useParams();

  const [plant, setPlant] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  let showAddToGardenButton = storedToken !== undefined;

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

  console.log("Water frequency", plant.water_frequency);

  let waterFrequencyMessage = "";
  if (plant.water_frequency !== undefined) {
    waterFrequencyMessage = `${plant.water_frequency.amount} per ${plant.water_frequency.cadence}`;
  }

  // add plant to garden
  const addPlantToGarden = () => {
    // request 'api/plants'
    // for every request to a project route we need to also send the token
    axios
      .post(
        `/users/plants/${plantId}`,
        {},
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log("Added plant to garden.");
        showAddToGardenButton = false;
      })
      .catch((err) => console.log(err));
  };

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
                <div className="col">
                  <PlantCharacteristics
                    title="Watering"
                    image="/images/watering.svg"
                    description={waterFrequencyMessage}
                  />
                </div>

                <div className="col">
                  <PlantCharacteristics
                    title="Watering"
                    image="/images/watering.svg"
                    description={waterFrequencyMessage}
                  />
                </div>

                <div className="col">
                  <PlantCharacteristics
                    title="Watering"
                    image="/images/watering.svg"
                    description={waterFrequencyMessage}
                  />
                </div>
              </div>
              <div className="row">
                <div>{plant.scientific_name}</div>
              </div>
              <div className="row plant-description">
                <div>{plant.description}</div>
              </div>
              {showAddToGardenButton && (
                <div className="row">
                  <div className="col-6">
                    <p></p>
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={addPlantToGarden}
                    >
                      Add to my Garden
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plant;
