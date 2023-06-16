import { useEffect, useState } from "react";
import lion from "../../assets/images/lion.jpeg";
import { Link } from "react-router-dom";
import { getCookie, removeCookie } from "../../utils/cookie";
const Header = () => {
  const [isUser, setIsUser] = useState("");

  useEffect(() => {
    const user = getCookie("access_token") ? true : false;
    setIsUser(user);
  }, []);

  const handleLogout = () => {
    removeCookie("access_token");
    window.location.href = "/"; // 새로고침 - 로그아웃 되었다는 것을 인지시켜주기 위해
  };
  return (
    <div
      id="header-wrapper"
      className="flex items-center justify-between w-full gap-5 bg-black px-5 py-2.5 h-20"
    >
      <div className="flex items-center">
        <img id="header-lion" src={lion} alt="lion" className="max-h-16" />
        <Link className="ml-3" to="/">
          Snulion Blog
        </Link>
      </div>

      <div className="flex">
        {!isUser ? (
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
            <Link to="/info" className="mr-10 p-3 uppercase">
              my page
            </Link>
            <Link to="/" onClick={handleLogout} className="mr-10 p-3 uppercase">
              log out
            </Link>
          </>
        )}

        {/* <Link to="/signup" className="p-3 uppercase">profile</Link> */}
      </div>
    </div>
  );
};

export default Header;
