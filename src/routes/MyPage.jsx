import { useState, useEffect } from "react";
import { MyPageForm, MyPost } from "../components/MyPage";
import { getUserInfoAll, getMyPosts } from "../apis/api";

const MyPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });

  useEffect(() => {
    const getUserInfoAllAPI = async () => {
      const userInfo = await getUserInfoAll();
      setFormData({
        email: userInfo.user.email,
        username: userInfo.user.username,
        college: userInfo.college,
        major: userInfo.major,
      });
    };
    getUserInfoAllAPI();
  }, []);

  const [myPosts, setMyPosts] = useState(null);

  useEffect(() => {
    const getMyPostsAPI = async () => {
      const response = await getMyPosts();
      setMyPosts(response);
    };
    getMyPostsAPI();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-1/2 mb-20">
        <h3 className=" font-bold text-4xl">My Info</h3>
        <MyPageForm formData={formData} setFormData={setFormData} />
      </div>

      <div className="flex flex-col items-center mb-20">
        <h3 className="font-bold text-4xl text-center">My Post</h3>
        <MyPost myPosts={myPosts} />
      </div>
    </>
  );
};

export default MyPage;
