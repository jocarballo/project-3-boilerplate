import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const Plant = () => {

    const { plantId } = useParams();

    const [plant, setPlant] = useState([]);

    const storedToken = localStorage.getItem('authToken')

    useEffect(() => {


        //fetch the data
        axios.get(`/plants/${plantId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(response => {
                console.log(response.data)
                setPlant(response.data)
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <div>
            <div>
                <div>{plant.common_name}</div>
                <div>{plant.scientific_name}</div>
                <div>{plant.description}</div>
             
            </div>
        </div>

    )
}


export default Plant;