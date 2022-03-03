import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Garden() {

    const [ plants, setPlants ] = useState([])
    console.log("garden here: ", plants)

    const storedToken = localStorage.getItem('authToken')
    

    // get all the plants from the user
    const getAllPlantsFromUser = () => {
        // request 'api/plants'
        // for every request to a project route we need to also send the token
        axios.get('/users/:id/plants', { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                //set the state of garden
                setPlants(response.data)
            })
            .catch(err => {
                console.log("error: ", err)
            })
    }

    useEffect(() => {
        getAllPlantsFromUser()
    }, [])

	return (
        <h1>Garden</h1>
	)
}
