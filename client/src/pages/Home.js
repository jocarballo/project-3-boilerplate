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

	// cada vey que a query altera tem que se guardar numa variável para que quando
	// a RouteChange for chamada podermos colocar essa variável na route

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
