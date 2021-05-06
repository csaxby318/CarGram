
import { NavLink} from 'react-router-dom'
import MyCarPage from './MyCarPage';


const UserProfilePage = () => {

    const fullName = localStorage.name 

    return (
        <div>
            <br/>
            <h2>Hi <strong>{fullName}!</strong> Welcome to your profile.</h2><br/>
            <NavLink to="/add-car">Add A Car</NavLink><br/>
            <MyCarPage />
        </div>
    )
}

export default UserProfilePage