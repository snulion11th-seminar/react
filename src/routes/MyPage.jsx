import { useEffect, useState } from "react";
import { SmallPost } from "../components/Posts";
import { Link } from "react-router-dom";
import { getPosts, getUser, setUserProfile } from "../apis/api";
import { getCookie } from "../utils/cookie";
import { MyPageForm } from "../components/Form";

const MyPage = () => {
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState({
    user: {
      id: null,
    },
  });
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    username: "",
    college: "",
    major: "",
  });

  useEffect(() => {
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostsAPI();

    const getUserAPI = async () => {
      const user = await getUser();
      setUser(user);
      setFormData({
        userId: user.user.id,
        email: user.user.email,
        username: user.user.username,
        college: user.college,
        major: user.major,
      });
      console.log("user", user);
    };
    getUserAPI();
  }, []);

  const submitFormData = async () => {
    console.log("submit", formData);
    await setUserProfile(formData);
  };

  return (
    <>
      <h3 className="font-bold text-4xl">My Info</h3>
      <MyPageForm
        id={"email"}
        formData={formData}
        setFormData={setFormData}
        submitFormData={submitFormData}
      />
      <MyPageForm
        id={"username"}
        formData={formData}
        setFormData={setFormData}
        submitFormData={submitFormData}
      />
      <MyPageForm
        id={"college"}
        formData={formData}
        setFormData={setFormData}
        submitFormData={submitFormData}
      />
      <MyPageForm
        id={"major"}
        formData={formData}
        setFormData={setFormData}
        submitFormData={submitFormData}
      />
      <h1 className="font-extrabold text-4xl truncate mt-10">My Posts</h1>
      <div className="grid grid-cols-2 px-10 mt-10">
        {postList
          .filter((post) => user.user.id === post.author.id)
          .map((post) => (
            <SmallPost key={post.id} post={post} />
          ))}
      </div>
    </>
  );
};

export default MyPage;
