import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PlantCharacteristics from "../components/PlantCharacteristics";
import { AuthContext } from "../context/auth";
import { useContext } from "react";

const Plant = () => {
  const { plantId } = useParams();

  const [plant, setPlant] = useState([]);

  let botanicalName = "";
  if (plant.botanical_name !== undefined) {
    botanicalName = plant.botanical_name;
  }

  const { isLoggedIn } = useContext(AuthContext);

  const [gardenButton, setGardenButton] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`/plants/${plantId}`)
      .then((response) => {
        console.log(response.data);
        setPlant(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("/garden", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        let plantIds = response.data.map((plant) => plant._id);
        if (plantIds.includes(plantId)) {
          setGardenButton(REMOVE_FROM_GARDEN);
        } else {
          setGardenButton(ADD_TO_GARDEN);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  let waterFrequencyMessage = "";
  if (plant.water_frequency !== undefined) {
    waterFrequencyMessage = `${plant.water_frequency.amount} per ${plant.water_frequency.cadence}`;
  }

  let soilFrequencyMessage = "";
  if (plant.soil !== undefined) {
    soilFrequencyMessage = `${plant.soil}`;
  }

  let lightFrquencyMessage = "";
  if (plant.light !== undefined) {
    lightFrquencyMessage = `${plant.light}`;
    switch (plant.light) {
      case "partly_sun":
        lightFrquencyMessage = "Don't expose the plant directly to the sun";
        break;
      case "partly_shaded":
        lightFrquencyMessage =
          "The plant need a bit of shadow and a bit of light";
        break;
      case "full_sun":
        lightFrquencyMessage = "This plant needs a lot of light!";
        break;
      default:
    }
  }

  // add plant to garden
  const addPlantToGarden = () => {
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
        setGardenButton(REMOVE_FROM_GARDEN);
      })
      .catch((err) => console.log(err));
  };

  // remove plant from garden
  const removePlantFromGarden = () => {
    axios
      .delete(`/users/plants/${plantId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("Removed plant from garden.");
        setGardenButton(ADD_TO_GARDEN);
      })
      .catch((err) => console.log(err));
  };


  // BASKET

  const [basketCounter, setBasketCounter] = useState(undefined)

  // add plant to basket
  const addPlantToBasket = () => {
    axios
      .put(
        "/basket",
        { plant: plantId },
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        console.log("Added plant to basket.", response.data);
        setBasketCounter(response.data.plants.length)
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar basketCounter={basketCounter}/>
      <div className="container-fluid plant-container">
        <div className="row fill">
          <div className="col-4 d-flex" style={{ background: "#fac400" }}>
            <img
              src={`/images/plants/${plant.image}.png`}
              alt="..."
              className="plant-image align-self-center"
            />
          </div>
          <div className="col d-flex" style={{ background: "#DFF6FF" }}>
            <div
              className="container align-self-center"
              id="plant-details-container-right"
            >
              <div className="row">
                <div className="botanical-name">
                  {botanicalName.toUpperCase()}
                </div>
              </div>
              <div className="row">
                <h1 className="title common-name">{plant.common_name}</h1>
              </div>
              <div className="row">
                <div className="col">
                  <PlantCharacteristics
                    title="Watering"
                    image="/images/watering.png"
                    description={waterFrequencyMessage}
                  />
                </div>

                <div className="col">
                  <PlantCharacteristics
                    title="Soil"
                    image="/images/soil.png"
                    description={soilFrequencyMessage}
                  />
                </div>

                <div className="col">
                  <PlantCharacteristics
                    title="Light"
                    image="/images/light.png"
                    description={lightFrquencyMessage}
                  />
                </div>
              </div>
              <div className="row plant-description">
                <div>{plant.description}</div>
              </div>
              {gardenButton === ADD_TO_GARDEN && (
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
              {gardenButton === REMOVE_FROM_GARDEN && (
                <div className="row">
                  <div className="col-6">
                    <p></p>
                    <button
                      type="button"
                      className="btn btn-dark button-remove-add-plant"
                      onClick={removePlantFromGarden}
                    >
                      Remove from my Garden
                    </button>
                  </div>
                </div>
              )}

              {isLoggedIn && (
                <div className="row">
                  <div className="col-6">
                    <p></p>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={addPlantToBasket}
                    >
                      Add to Basket
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

const ADD_TO_GARDEN = "Add";
const REMOVE_FROM_GARDEN = "Remove";

export default Plant;
