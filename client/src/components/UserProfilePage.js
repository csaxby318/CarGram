
import { NavLink} from 'react-router-dom'
import MyCarPage from './MyCarPage';


const UserProfilePage = () => {

    const fullName = localStorage.name 

    return (
        <div>
            <h1>Hi {fullName}! Welcome to your profile.</h1>
            <MyCarPage />
            <NavLink to="/add-car">Add A Car</NavLink><br/>
            <NavLink to="/add-photos">Add Car Photos</NavLink>
        </div>
    )
}

export default UserProfilePage