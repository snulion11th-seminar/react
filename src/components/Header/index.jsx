import lion from "../../assets/images/lion.jpeg";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      id="header-wrapper"
      className="flex items-center justify-between w-full gap-5 bg-black px-5 py-2.5 h-20"
    >
      <div className="flex items-center">
        <img id="header-lion" src={lion} alt="lion" className="max-h-16" />
        <Link to="/" className="ml-3">Snulion Blog</Link>
      </div>
      <div className="flex">
        <Link to="/signin" className="mr-10 p-3 uppercase">sign in</Link>
        <Link to="/signup" className="mr-10 p-3 uppercase">sign up</Link>
      </div>
    </div>
  );
};

export default Header;
