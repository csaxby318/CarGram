
import Footer from "./Footer"
import Menu from "./Menu"
import '../App.css';

const BaseLayout = (props) => {

    return (
        <div>
            <Menu />
            <div className="container-fluid">
                {props.children}
            </div>
            <Footer />
        </div>
    )
}

export default BaseLayout