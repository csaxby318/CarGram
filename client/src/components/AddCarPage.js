
import { useState } from 'react';

const AddCarPage = () => {
    
    const userId = localStorage.userId

    const [car, setCar] = useState({
        year: '',
        make: '',
        model: '',
        userId: userId
    })

    const handleOnChange = (event) => {
        setCar({
            ...car,
            [event.target.name]: event.target.value 
        })
    }

    const handleCarAdd = () => {
        
        fetch('http://localhost:8080/cars/add-car', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({car})
        }).then(window.location.href = "/my-profile")
    }

    return (
        <div>
            <h1>Add Car</h1>
            <input type="text" placeholder="Year" name="year" onChange={handleOnChange} />
            <input type="text" placeholder="Make" name="make" onChange={handleOnChange} />
            <input type="text" placeholder="Model" name="model" onChange={handleOnChange} />
            <button onClick={handleCarAdd}>Add Car</button>
        </div>
    )
}

export default AddCarPage