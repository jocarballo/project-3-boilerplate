import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function Signup() {
   
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ errorMessage, setErrorMessage ] = useState(undefined);


    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const reqBody = { username, email, password }
        axios.post('/signup', reqBody)
            .then(response => {
                // redirect to login
                navigate('/login')
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    const handleUsername = e => setUsername(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    return (
        <>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" value={username} onChange={handleUsername} />
                <label htmlFor="email">Email:</label>
                <input type="text" value={email} onChange={handleEmail} />
                <label htmlFor="password">Password:</label>
                <input type="text" value={password} onChange={handlePassword} />
                <button type="submit">Sign Up</button>
            </form>

            {errorMessage && <h5>{errorMessage}</h5>}

            <h3>Already have an account?</h3>
            <Link to='/login'>Login</Link>

        </>
    )

}