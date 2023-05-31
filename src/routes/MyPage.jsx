import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import { getPosts, getUserInfo, updateUserInfo } from "../apis/api";
import { SmallPost } from "../components/Posts";

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });

  const [defaultInfo, setDefaultInfo] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });

  const [isEdit, setIsEdit] = useState({
    email: false,
    username: false,
    college: false,
    major: false,
  });

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      if (getCookie("access_token")) {
        const currentUserInfo = await getUserInfo();

        setUserInfo({
          email: currentUserInfo.user.email,
          username: currentUserInfo.user.username,
          major: currentUserInfo.major,
          college: currentUserInfo.college,
        });
        setDefaultInfo({
          email: currentUserInfo.user.email,
          username: currentUserInfo.user.username,
          major: currentUserInfo.major,
          college: currentUserInfo.college,
        });
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
      console.log("post fetch success");
    };
    getPostsAPI();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleEdit = (e) => {
    const { id } = e.target;
    setIsEdit((prev) => ({ ...prev, [id]: true }));
  };

  const handleSave = (e) => {
    const { id } = e.target;
    setIsEdit((prev) => ({ ...prev, [id]: false }));
    updateUserInfo(userInfo);
  };

  const handleCancel = (e) => {
    const { id } = e.target;
    setUserInfo((prevUser) => ({
      ...prevUser,
      [id]: defaultInfo[id],
    }));
    setIsEdit((prev) => ({
      ...prev,
      [id]: false,
    }));
  };

  return (
    <>
      <div className="justify-center font-bold text-4xl">My Info</div>
      <div className="flex flex-col items-center w-1/2">
        <label htmlFor="email" className="label">
          email :
        </label>

        {isEdit.email ? (
          <>
            <input
              type="email"
              id="email"
              className="input"
              onChange={handleChange}
              value={userInfo.email}
            />
            <div className="justify-center">
              <button
                className="button mt-4 mx-2 px-10"
                onClick={handleSave}
                id="email"
              >
                Done
              </button>
              <button
                className="button mt-4 mx-2 px-10"
                onClick={handleCancel}
                id="email"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center w-full ml-5">
              <p className="font-bold">{defaultInfo.email}</p>
              <button
                id="email"
                className="button flex items-center mt-1 mx-2 px-10 custom-button"
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
            <div className="underline-line mt-2"></div>
          </>
        )}

        <label htmlFor="name" className="label">
          username :
        </label>

        {isEdit.username ? (
          <>
            <input
              type="text"
              id="username"
              className="input"
              onChange={handleChange}
              value={userInfo.username}
            />
            <div className="justify-center">
              <button
                className="button mt-4 mx-2 px-10"
                onClick={handleSave}
                id="username"
              >
                Done
              </button>
              <button
                className="button mt-4 mx-2 px-10"
                onClick={handleCancel}
                id="username"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center w-full ml-5">
              <p className="font-bold">{defaultInfo.username}</p>
              <button
                id="username"
                className="button flex items-center mt-1 mx-2 px-10 custom-button"
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
            <div className="underline-line mt-2"></div>
          </>
        )}

        <label htmlFor="college" className="label">
          college :
        </label>

        {isEdit.college ? (
          <>
            <input
              type="text"
              id="college"
              className="input"
              onChange={handleChange}
              value={userInfo.college}
            />
            <div className="justify-center">
              <button
                className="button mt-4 mx-2 px-10"
                onClick={handleSave}
                id="college"
              >
                Done
              </button>
              <button
                className="button mt-4 mx-2 px-10"
                onClick={handleCancel}
                id="college"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center w-full ml-5">
              <p className="font-bold">{defaultInfo.college}</p>
              <button
                id="college"
                className="button flex items-center mt-1 mx-2 px-10 custom-button"
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
            <div className="underline-line mt-2"></div>
          </>
        )}

        <label htmlFor="major" className="label">
          major :
        </label>
        {isEdit.major ? (
          <>
            <input
              type="text"
              id="major"
              className="input"
              onChange={handleChange}
              value={userInfo.major}
            />
            <div className="justify-center">
              <button
                className="button mt-4 mx-2 px-10"
                onClick={handleSave}
                id="major"
              >
                Done
              </button>
              <button
                className="button mt-4 mx-2 px-10"
                onClick={handleCancel}
                id="major"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center w-full ml-5">
              <p className="font-bold">{defaultInfo.major}</p>
              <button
                id="major"
                className="button flex items-center mt-1 mx-2 px-10 custom-button"
                onClick={handleEdit}
              >
                Edit
              </button>
            </div>
            <div className="underline-line mt-2"></div>
          </>
        )}
      </div>

      <div className="justify-center font-bold text-4xl mt-12">My Posts</div>
      <div className="items-center grid grid-cols-2 px-10 mt-10">
        {postList
          .filter((post) => post.author.username === userInfo.username)
          .map((post) => (
            <SmallPost key={post.id} post={post} />
          ))}
      </div>
    </>
  );
};

export default MyPage;
