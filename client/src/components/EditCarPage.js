
import { useState, useEffect } from 'react';
import axiox from 'axios';

const EditCarPage = (props) => {

    const [car, setCar] = useState({
        year: "",
        make: "",
        model: ""
    })

    useEffect(() => {
        fetchThisCar()
    }, [])

    const handleOnChange = (event) => {
        setCar({
            ...car,
            [event.target.name]: event.target.value 
        })
    }

    const fetchThisCar = () => {
        axiox.get(`http://localhost:8080/cars/my-car/edit/${props.match.params.carId}`)
        .then(response => {
            if(response.data.error) {
               console.log(response.data.error)
           } else {
               setCar(response.data)
           }
        })
    }

    const handleCarEdit = () => {
        
        fetch(`http://localhost:8080/cars/my-car/edit/${props.match.params.carId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({car})
        }).then(window.location.href = "/my-profile")
    }

    const handleCarDelete = () => {
        
        fetch(`http://localhost:8080/cars/my-car/delete/${props.match.params.carId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({car})
        }).then(window.location.href = "/my-profile")
    }

    return (
        <div>
            <p>Edit Car</p>
            <input type="text" placeholder="Year" name="year" value={car.year} onChange={handleOnChange} />
            <input type="text" placeholder="Make" name="make" value={car.make} onChange={handleOnChange} />
            <input type="text" placeholder="Model" name="model" value={car.model} onChange={handleOnChange} />
            <button onClick={handleCarEdit}>Edit Car</button>
            <button onClick={handleCarDelete}>Delete Car</button>
        </div>
    )
}

export default EditCarPage