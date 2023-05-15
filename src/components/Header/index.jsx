import { Link } from "react-router-dom";

import lion from "../../assets/images/lion.jpeg";

const Header = () => {
  return (
    <div
      id="header-wrapper"
      className="flex items-center justify-between w-full gap-5 bg-black px-5 py-2.5 h-20"
    >
      <div className="flex items-center">
        <img id="header-lion" src={lion} alt="lion" className="max-h-16" />
        {/* 추가 👇🏻 */}
        <Link to="/" className="ml-3">
          Snulion Blog
        </Link>
        {/* 추가 👆🏻 */}
      </div>
      {/* 추가 👇🏻 */}
      <div className="flex">
        <Link to="/signin" className="mr-10 p-3 uppercase">
          sign in
        </Link>
        <Link to="/signup" className="mr-10 p-3 uppercase">
          sign up
        </Link>
      </div>
      {/* 추가 👆🏻 */}
    </div>
  );
};

export default Header;
