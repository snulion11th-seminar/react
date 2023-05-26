import { useEffect } from "react";
import lion from "../../assets/images/lion.jpeg";
import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getCookie, removeCookie } from "../../utils/cookie";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const isToken = getCookie("access_token") ? true : false;
    setIsLoggedIn(isToken);
  }, [isLoggedIn]);

  const handleLogout = () => {
    removeCookie("access_token");
    removeCookie("refresh_token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div
      id="header-wrapper"
      className="flex items-center justify-between w-full gap-5 bg-black px-5 py-2.5 h-20"
    >
      <div className="flex items-center">
        <img id="header-lion" src={lion} alt="lion" className="max-h-16" />
        <Link to="/" className="ml-3">
          Snulion Blog
        </Link>
      </div>
      <div className="flex">
        {isLoggedIn ? (
          <Link to="/" onClick={handleLogout} className="mr-10 p-3 uppercase">
            log out
          </Link>
        ) : (
          <div>
            <Link to="/signin" className="mr-10 p-3 uppercase">
              sign in
            </Link>
            <Link to="/signup" className="mr-10 p-3 uppercase">
              sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
