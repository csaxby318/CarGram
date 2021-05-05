
import { useState, useEffect } from 'react';
import axiox from 'axios';
import { NavLink } from 'react-router-dom';

const MyCarPhotosPage = (props) => {

    const [photos, setPhotos] = useState([])

    useEffect(() => {
        fetchMyCarPhotos()
    }, [])

    const fetchMyCarPhotos = () => {
        axiox.get(`http://localhost:8080/cars/my-car/photos/${props.match.params.carId}`)
            .then(response => {
                if (response.data.error) {
                    console.log(response.data.error)
                } else {
                    setPhotos(response.data)
                }
            })
    }

    // const photoItems = photos.map((photo, index) => {
    //     return <div key={index}> <img src={photo.fileName} /> </div>
    // })



    return (
        <div>
            <NavLink to="/my-profile">Back</NavLink>
            <br /><br />
            <h3>My Car Photos</h3>
            <div className='img-grid'>
                {photos.map((photo, index) => (
                    <div  key={index} className='img-wrap'>
                        <img src={photo.fileName} alt='' />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyCarPhotosPage