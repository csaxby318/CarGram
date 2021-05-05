
import { useState, useEffect } from 'react';
import axiox from 'axios';
import { NavLink } from 'react-router-dom';

const MyCarPage = () => {

    const userId = localStorage.userId

    const [cars, setCars] = useState([])

    useEffect(() => {
        fetchMyCar()
    }, [])

    const fetchMyCar = () => {
        axiox.get(`http://localhost:8080/cars/my-car/${userId}`)
        .then(response => {
            if(response.data.error) {
               console.log(response.data.error)
           } else {
               setCars(response.data)
           }
        })
    }

    const carItems = cars.map((car, index) => {
        return <div key={index}>{car.year} {car.make} {car.model} - <NavLink to={`/edit-car/${car.id}`}>Edit Car</NavLink></div>
    })

    return (
        <div>
            {carItems}
        </div>
    )
}


export default MyCarPage