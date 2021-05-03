
import React, { useState } from 'react'

const RegisterPage = () => {

    const [user, setUser] = useState({})

    const handleOnChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value 
        })
    }  

    const handleRegister = () => {
        fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({user})
        }).then(window.location.href = "/login")
    }
    
    return (
        <div>
            <div>
                <h3>Register</h3>
                <input onChange={handleOnChange} type="text" placeholder="Name" name="name"></input>
                <input onChange={handleOnChange} type="text" placeholder="Username" name="username"></input>
                <input onChange={handleOnChange} type="password" placeholder="Password" name="password"></input>
                <button onClick={handleRegister}>Register</button>
            </div>
        </div>

    )
}

export default RegisterPage