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
        <Link to="/signin" className="mr-10 p-3 uppercase">sign In</Link>
        <Link to="/signup" className="mr-10 p-3 uppercase">sign up</Link>
        {/* <Link to="/signup" className="p-3 uppercase">profile</Link> */}
      </div>
    </div>
  )
} 

export default Header;
