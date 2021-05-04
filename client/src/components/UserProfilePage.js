

import { setAuthenticationHeader } from './utils/authenticate';
import { connect } from 'react-redux';
import * as actionCreators from './store/creators/actionCreators'
import { NavLink} from 'react-router-dom'
import MyCarPage from './MyCarPage';


const UserProfilePage = (props) => {

    const fullName = localStorage.name 

    const signOut = () => {
        // remove token from local storage
        localStorage.removeItem('jsonwebtoken')
        localStorage.removeItem('username')
        localStorage.removeItem('name')

        // clear up the authentication headers
        setAuthenticationHeader(null)

        // perform a dispatch and set the isAuthenticated globle state to false
        props.onSignOut()

        // redirect to home page
        props.history.push('/')
    }


    return (
        <div>
            <h1>Hi {fullName}! Welcome to your profile.</h1>
            <MyCarPage />
            <button><NavLink to="/add-car">Add A Car</NavLink></button>
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignOut: () => dispatch(actionCreators.userLogout())
    }
}

export default connect(null, mapDispatchToProps)(UserProfilePage)