
import { useState, useEffect } from 'react';
import axiox from 'axios';

const MyCarPage = (props) => {

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
        return <div key={index}>{car.year} {car.make} {car.model}</div>
    })

    return (
        <div>
            {carItems}
        </div>
    )
}


export default MyCarPage