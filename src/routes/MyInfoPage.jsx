import { useState, useEffect } from "react";
import { SmallPost } from "../components/Posts";
import { getUserProfile } from "../apis/api";
import { updateUserProfile } from "../apis/api";
import { getPosts } from "../apis/api";
import { useParams } from "react-router-dom";

const MyInfo = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });

  const [postList, setPostList] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostsAPI();
  }, []);

  console.log("postlist", postList);

  useEffect(() => {
    const getUserAPI = async () => {
      const info = await getUserProfile();
      console.log("info", info);
      setId(info.data.user.id);
      setFormData({
        email: info.data.user.email,
        username: info.data.user.username,
        college: info.data.college,
        major: info.data.major,
      });
    };
    getUserAPI();
  }, []);

  const [tempFormData, setTempFormData] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });

  useEffect(() => {
    setTempFormData({ ...formData });
    console.log("tempdata", tempFormData);
  }, [formData]);

  const [isChange, setIsChange] = useState({
    email: false,
    username: false,
    college: false,
    major: false,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...tempFormData });
    updateUserProfile();
    setIsChange(false);
  };

  const handleFormData = (e) => {
    const { id, value } = e.target;
    setTempFormData({ ...tempFormData, [id]: value });
  };

  const onClickChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setIsChange((info) => ({ ...info, [id]: true }));
  };

  const onClickCancle = (e) => {
    e.preventDefault();
    const { id } = e.target;
    setTempFormData({ ...formData });
    setIsChange((info) => ({ ...info, [id]: false }));
  };

  const [user, setUser] = useState();

  return (
    <div className="w-full">
      <div className="font-bold text-4xl mb-5 md:text-center">My Page</div>
      <div className="w-1/2 m-auto">
        <div>
          <label htmlFor="email" className="label">
            Email:
          </label>
        </div>
        <div className="flex">
          {isChange.email ? (
            <>
              <input
                required
                type="email"
                id="email"
                className="infoinput"
                onChange={handleFormData}
                value={tempFormData.email}
              />
              <button
                className="infobutton mr-3 flex-row-reverse"
                onClick={onClickCancle}
                id="email"
              >
                Cancel
              </button>
              <button className="infobutton" onClick={onSubmit}>
                Edit
              </button>
            </>
          ) : (
            <>
              <div className="infoinput">{formData.email}</div>
              <button
                className="infobutton py-0.5 mb-1 w-20"
                id="email"
                onClick={onClickChange}
              >
                Change
              </button>
            </>
          )}
        </div>
        <hr className="mb-3"></hr>
        <div>
          <label required htmlFor="name" className="label">
            Username:
          </label>
        </div>
        <div className="flex">
          {isChange.username ? (
            <>
              <input
                required
                type="text"
                id="username"
                className="infoinput"
                onChange={handleFormData}
                value={tempFormData.username}
              />
              <button
                className="infobutton mr-3 flex-row-reverse"
                onClick={onClickCancle}
                id="username"
              >
                Cancel
              </button>
              <button className="infobutton" onClick={onSubmit}>
                Edit
              </button>
            </>
          ) : (
            <>
              <div className="infoinput">{formData.username}</div>
              <button
                className="infobutton py-0.5 mb-1 w-20"
                id="username"
                onClick={onClickChange}
              >
                Change
              </button>
            </>
          )}
        </div>
        <hr className="mb-3"></hr>
        <div>
          <label required htmlFor="college" className="label">
            College:
          </label>
        </div>
      <div className="flex">
        {isChange.college ? (
          <>
            <input
              required
              type="text"
              id="college"
              className="infoinput"
              onChange={handleFormData}
              value={tempFormData.college}
            />
            <button
              className="infobutton mr-3 flex-row-reverse"
              onClick={onClickCancle}
              id="college"
            >
              Cancel
            </button>
            <button className="infobutton" onClick={onSubmit}>
              Edit
            </button>
          </>
        ) : (
          <>
            <div className="infoinput">{formData.college}</div>
            <button
              className="infobutton py-0.5 mb-1 w-20"
              id="college"
              onClick={onClickChange}
            >
              Change
            </button>
          </>
        )}
      </div>
      <hr className="mb-3"></hr>

      <div>
        <div>
          <label htmlFor="major" className="label">
            Major:{" "}
          </label>
        </div>
        <div className="flex">
          {isChange.major ? (
            <>
              <input
                required
                type="text"
                id="major"
                className="infoinput"
                onChange={handleFormData}
                value={tempFormData.major}
              />
              <button
                className="infobutton mr-3 flex-row-reverse"
                onClick={onClickCancle}
                id="major"
              >
                Cancel
              </button>
              <button className="infobutton" onClick={onSubmit}>
                Edit
              </button>
            </>
          ) : (
            <>
              <div className="infoinput">{formData.major}</div>
              <button
                className="infobutton py-0.5 mb-1 w-20"
                id="major"
                onClick={onClickChange}
              >
                Change
              </button>
            </>
          )}
        </div>
        <hr className="mb-10"></hr>
      </div>
      </div>

      <div className="font-bold text-4xl mb-5 md:text-center">My Post</div>
      <div className="w-full grid grid-cols-4 px-10 mt-10">
        {postList
          .filter((post) => post.author.id == id)
          .map((post) => (
            <SmallPost key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default MyInfo;
