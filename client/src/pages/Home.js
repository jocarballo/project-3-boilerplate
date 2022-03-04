import React from 'react'
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";



export default function Home() {

	let query = "";

	let navigate = useNavigate();
	const routeChange = () => {
		console.log("routeChange")
		let path = `/plants?query=${query}`;
		navigate(path);
	}

	// accessing query (value)
	const queryChanged = (event) => {
		console.log(event.target.value);
		query = event.target.value;
	}




	return (
		<>
		<Navbar />
			<h1>This is the Home Page</h1>
			<img className="homepage-image" src="../homepage.png" alt="img from plants" />
			<div className="search-container">
      				<input type="text" placeholder="Ex: Monstera" name="search" onChange={queryChanged}/>
					<p></p>
      				<button type="text" onClick={routeChange}>Search for a Plant</button>
  			</div>
		</>
	)
}
