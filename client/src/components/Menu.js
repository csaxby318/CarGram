
import { connect } from 'react-redux';
import { setAuthenticationHeader } from './utils/authenticate';
import * as actionCreators from './store/creators/actionCreators'

const Menu = (props) => {

    const signOut = () => {
        // remove token from local storage
        localStorage.removeItem('jsonwebtoken')
        localStorage.removeItem('username')
        localStorage.removeItem('name')
        localStorage.removeItem('userId')

        // clear up the authentication headers
        setAuthenticationHeader(null)

        // perform a dispatch and set the isAuthenticated globle state to false
        props.onSignOut()

        // redirect to home page
        window.location.replace('/')
    }

    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-warning">
            <div className="container-fluid">

                <a className="navbar-brand" href="/"><h1>Exotic Swap</h1></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="/"><strong>Home</strong></a>
                        </li>
                        <li className="nav-item">
                            {props.isAuthenticated ? <a className="nav-link active" href="/my-profile"><strong>My Profile</strong></a> : <a className="nav-link active" href="/register"><strong>Register</strong></a>}
                        </li>
                        <li className="nav-item">
                        {props.isAuthenticated ? <div className="nav-link active" onClick={signOut}><strong>Sign Out</strong></div> : <a className="nav-link active" href="/login"><strong>Login</strong></a>}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.isAuthenticated
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSignOut: () => dispatch(actionCreators.userLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)