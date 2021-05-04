
import axios from 'axios';
import { useState } from 'react'

const AddPhotosPage = () => {
    
    const [photos, setPhotos] = useState([])

    const types = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg']

    const uploadHandler = (event) => {
        
        const data = new FormData()
        const selectedPhoto = event.target.files[0]

        if (selectedPhoto && types.includes(selectedPhoto.type)) {
            data.append('file', selectedPhoto)
        } 

        axios.post('http://localhost:8080/cars/photo-upload', data)
            .then((res) => {
                setPhotos({ photos: [res.data, ...photos] })
            })
    }

    
    return (
        <div>
            <h1>Add Photos</h1>
            <input type="file" name="file" accept="image/*" multiple={false} onChange={uploadHandler} />
        </div>
    )
}

export default AddPhotosPage