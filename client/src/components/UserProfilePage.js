

import { setAuthenticationHeader } from './utils/authenticate';
import { connect } from 'react-redux';
import * as actionCreators from './store/creators/actionCreators'


const UserProfilePage = (props) => {

   
    const signOut = () => {
        // remove token from local storage
        localStorage.removeItem('jsonwebtoken')
        localStorage.removeItem('username')

        // clear up the authentication headers
        setAuthenticationHeader(null)

        // perform a dispatch and set the isAuthenticated globle state to false
        props.onSignOut()

        // redirect to home page
        props.history.push('/')
    }


    return (
        <div>
            <h1>My Profile</h1>
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