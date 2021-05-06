
import { useState, useEffect } from 'react';
import axiox from 'axios';
import { NavLink } from 'react-router-dom';
import AddPhotosPage from './AddPhotosPage';

const MyCarPage = () => {

    const userId = localStorage.userId

    const [cars, setCars] = useState([])

    useEffect(() => {
        fetchMyCar()
    }, [])

    const fetchMyCar = () => {
        axiox.get(`http://localhost:8080/cars/my-car/${userId}`)
            .then(response => {
                if (response.data.error) {
                    console.log(response.data.error)
                } else {
                    setCars(response.data)
                }
            })
    }

    const carItems = cars.map((car, index) => {
        return <div key={index}>
                    <br/>
                    <h4>{car.year} {car.make} {car.model}</h4>
                    <NavLink to={`/edit-car/${car.id}`}>Edit Car</NavLink> - <NavLink to={`/add-photos/${car.id}`}>Add Car Photos</NavLink>
                    <div className='img-grid'>
                        {car.photos.map((photo, index) => (
                            <div key={index} className='img-wrap'>
                                <img src={photo.fileName} />
                            </div>
                        ))}
                    </div>
                </div>
    })

    return (
        <div>
            {carItems}
        </div>
    )
}


export default MyCarPage