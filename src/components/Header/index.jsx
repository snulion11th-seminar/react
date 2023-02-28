import "./Header.css";
import lion from "../../assets/images/lion.jpeg"
const Header = () => {
    return (
        <div id="header-wrapper">
            <img id="header-lion" src={lion} alt="lion" />
            <h3>Snulion Blog</h3>
        </div>
    )
} 

export default Header;
