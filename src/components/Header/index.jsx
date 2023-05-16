import { Link } from "react-router-dom";
import lion from "../../assets/images/lion.jpeg";
import "./Header.css";
const Header = () => {
  return (
    <div id="header-wrapper" className="flex justify-between">
      <div className="flex items-center">
        <img id="header-lion" src={lion} alt="lion" />
        <Link to="/" className="m1-3">
          Snulion Blog
        </Link>
      </div>
      <div className="flex">
        <Link to="/signin" className="mr-10 p-3 uppercase">
          sign in
        </Link>
        <Link to="/signup" className="mr-10 p-3 uppercase">
          sign up
        </Link>
      </div>
    </div>
  );
};

export default Header;
