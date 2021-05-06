
import '../App.css'
import { useState, useEffect } from 'react';
import axiox from 'axios';

const HomePage = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const fetchAllUsers = () => {
        axiox.get(`http://localhost:8080/user`)
            .then(response => {
                if (response.data.error) {
                    console.log(response.data.error)
                } else {
                    setUsers(response.data)
                }
            })
    }
    
    const userItems = users.map((user, index) => {
        return <div key={index}>
            <h4>{user.name}'s</h4> 

            {user.cars.map((car, index) => (
                <div key={index}>
                    <h5>{car.year} {car.make} {car.model}</h5>
                    <div className='img-grid'>
                        {car.photos.map((photo, index) => (
                            <div key={index} className='img-wrap'>
                                <img src={photo.fileName} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    })

    return (
        <div className="container-fluid" id="home-page">
            {userItems}
        </div>
    )
}


export default HomePage