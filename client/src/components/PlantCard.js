import React from 'react'
import { Link } from 'react-router-dom'



export default function PlantCard(props) {

    const plant = props.plant

    return (
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
    )
}
