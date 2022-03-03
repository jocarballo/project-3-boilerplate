import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function Plants() {

    const [ plants, setPlants ] = useState([])
    console.log("plants here: ", plants)

    const storedToken = localStorage.getItem('authToken')

    // get all the plants from the backend / server
    const getAllPlants = () => {
        // request 'api/plants'
        // for every request to a project route we need to also send the token
        axios.get('/plants', { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                //set the state of plants
                setPlants(response.data)
            })
            .catch(err => {
                console.log("error: ", err)
            })
    }

    useEffect(() => {
        getAllPlants()
    }, [])

	return (
        <>
            <h1>Here you can see all the plants</h1>
            <div className="allPlants">
               {plants.map((plant, i) => (
                    <ul key={i} className="plant">
                        <div>Common Name: {plant.common_name}</div>
                        <Link to={`/plants/${plant._id}`}>Details</Link>
                    </ul>
               ))}
            </div>
        </>
		
	)
}