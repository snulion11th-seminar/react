import { Link } from "react-router-dom";
import lion from "../../assets/images/lion.jpeg";
import { getCookie, removeCookie } from "../../utils/cookie";
import { useEffect, useState } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("");

  useEffect(() => {
    const loggedIn = getCookie("access_token") ? true : false;
    setIsLoggedIn(loggedIn);
  }, []);
  // isLoggedIn을 통해 로그인여부 확인
  // getCookie를 통해 access token을 가져올 수 있으면 로그인 된 것으로 설정

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

        {/* isLoggedIn이 False일 때는 sign In, sign up 버튼을,
					 True일 때는 log out버튼을 보여줌  */}
      </div>
    </div>
  );
};

export default Header;
