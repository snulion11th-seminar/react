import lion from "../../assets/images/lion.jpeg";
import { Link } from "react-router-dom";
import { getCookie, removeCookie } from "../../utils/cookie";
import { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("");

  useEffect(() => {
    const loggedIn = getCookie("access_token") ? true : false;
    setIsLoggedIn(loggedIn);
  }, []);
  const handleLogout = () => {
    removeCookie("access_token");
    removeCookie("refresh_token");
    window.location.href = "/"; // 새로고침 - 로그아웃 되었다는 것을 인지시켜주기 위해
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
        {!isLoggedIn ? (
          <>
            <Link to="/signin" className="mr-10 p-3 uppercase">
              sign In
            </Link>
            <Link to="/signup" className="mr-10 p-3 uppercase">
              sign up
            </Link>
          </>
        ) : (
          <>
            <Link to="/" onClick={handleLogout} className="mr-10 p-3 uppercase">
              log out
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
