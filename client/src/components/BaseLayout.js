
import Menu from "./Menu"
import '../App.css';

const BaseLayout = (props) => {

    return (
        <div>
            <Menu />
            <div className="container-fluid">
                {props.children}
            </div>
        </div>
    )
}

export default BaseLayout