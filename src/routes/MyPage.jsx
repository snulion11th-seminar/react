import { useEffect, useState } from "react";
import { MyPageForm } from "../components/Form";
import { SmallPost } from "../components/Posts";
import { getPosts, getUser, updateAccount } from "../apis/api";
import { getCookie } from "../utils/cookie";

const MyPage = () => {
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState();
  const [formData, setFormData] = useState({
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
  }, []);

  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        const user = await getUser();
        console.log(user);
        setUser(user);
      };
      getUserAPI();
    }
  }, []);

  useEffect(() => {
    // 유저 정보가 있으면 폼 데이터에 유저 정보를 넣어줌
    if (user && user.user) {
      setFormData({
        email: user.user.email,
        username: user.user.username,
        college: user.college,
        major: user.major,
      });
    }
  }, [user]);

  const handleUpdateAccount = (formData) => {
    console.log(formData);
    updateAccount(formData);
  };

  return (
    <div className="flex flex-col items-center w-1/2">
      <h3 className="font-bold text-4xl">My Info</h3>
      <MyPageForm
        formData={formData}
        setFormData={setFormData}
        handleUpdateAccount={handleUpdateAccount}
      />

      <h3 className="font-bold text-4xl mt-10">My Posts</h3>

      <div className="grid grid-cols-4 px-10 mt-10">
        {postList
          .filter((post) => user?.user.id === post?.author.id)
          .map((post) => (
            <SmallPost key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default MyPage;
