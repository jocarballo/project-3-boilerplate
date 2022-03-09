import React from 'react'
import { Link } from 'react-router-dom'
import getColorByIndex from '../utilities'


export default function PlantCard(props) {
    const plant = props.plant

    const index = props.index
    const backgroundColor = getColorByIndex(index)
   

    return (
        <div className="col-3 mt-4 mb-2">
              <Link className="link" to={`/plants/${plant._id}`}>
                <div
                  className="plant-card shadow rounded"
                >
                  <div className="img-container d-flex justify-content-center align-items-center rounded" style={{background: backgroundColor}}>
                    <img
                      src={`images/plants/${plant.image}.png`}
                      className="card-img-top"
                      alt="..."
                    />
                  </div>

                  <div
                    className="plant-card-body card-body rounded-top rounded-4"
                    style={{ background: "white" }}
                  >
                    <h5 className="card-title">{plant.common_name}</h5>
                    <p className="card-text">{plant.botanical_name}</p>
                  </div>
                </div>
              </Link>
            </div>
    )
}
