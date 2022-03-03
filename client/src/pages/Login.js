import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import axios from 'axios'



export default function Login() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState(undefined);

    const navigate = useNavigate()

    const { storeToken, verifyStoredToken } = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault()
        const reqBody = { username, password }
        axios.post('/login', reqBody)
            .then(response => {
                //redirecting to home
                console.log("I have a token cuties")
                const token = response.data.authToken
                // store the token
                storeToken(token)
                verifyStoredToken()
                    .then(() => {
                        // redirect to home
                        navigate('/')
                    })
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    const handleUsername = e => setUsername(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" value={username} onChange={handleUsername} />
                <label htmlFor="password">Password:</label>
                <input type="text" value={password} onChange={handlePassword} />
                <button type="submit">Log In</button>
            </form>

            {errorMessage && <h5>{errorMessage}</h5>}

            <h3>Don't have an account?</h3>
			<Link to='/signup'>Signup</Link>
        </>
    )
}