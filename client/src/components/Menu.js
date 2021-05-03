
const Menu = () => {

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
                            <a className="nav-link active" href="/login"><strong>Login</strong></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/register"><strong>Register</strong></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/my-profile"><strong>My Profile</strong></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Menu