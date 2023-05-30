import { useEffect, useState } from "react";
import lion from "../../assets/images/lion.jpeg";
import { Link } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { logOut } from "../../apis/api";

const Header = () => {
  const [isUser, setIsUser] = useState("");

  useEffect(() => {
    const user = getCookie("access_token") ? true : false;
    setIsUser(user);
  }, []);

  const handleLogout = () => {
    const token = getCookie("refresh_token");
    logOut(token);
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
              SIGN IN
            </Link>
            <Link to="/signup" className="mr-10 p-3 uppercase">
              SIGN UP
            </Link>
          </>
        ) : (
          <>
            <Link to="/mypage" className="mr-10 p-3 uppercase">
              MY PAGE
            </Link>
            <Link to="/" onClick={handleLogout} className="mr-10 p-3 uppercase">
              LOG OUT
            </Link>
          </>
        )}

        {/* <Link to="/signup" className="p-3 uppercase">profile</Link> */}
      </div>
    </div>
  );
};

export default Header;
