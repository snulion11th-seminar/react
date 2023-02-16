import "./Header.css";
import lion from "../../assets/images/lion.jpeg"
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div id="header-wrapper" className="flex justify-between">
            <div className="flex items-center">
                <img id="header-lion" src={lion} alt="lion" />
                <Link className="ml-3" to="/">Snulion Blog</Link>
            </div>

            <div className="flex">
                <Link to="/signin" className="mr-10 button p-3">Sign In</Link>
                <Link to="/signup" className="button p-3">Sign Up</Link>
            </div>
        </div>
    )
} 

export default Header;
