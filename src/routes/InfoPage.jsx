import { useState, useEffect } from "react";
import { InfoElement } from "../components/Info";
import { getUser, getPosts } from "../apis/api";
import { SmallPost } from "../components/Posts";

const InfoPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostsAPI();

    const getUserAPI = async () => {
      const userInfo = await getUser();
      console.log(userInfo);
      setFormData({
        email: userInfo.user.email,
        username: userInfo.user.username,
        college: userInfo.college,
        major: userInfo.major,
      });
    };
    getUserAPI();
  }, []);
  console.log(formData);

  return (
    <div className="flex flex-col items-center w-1/2">
      <h3 className=" font-bold text-4xl">My Info</h3>
      <InfoElement infoContent={formData.email} infoTitle="email" />
      <InfoElement infoContent={formData.username} infoTitle="username" />
      <InfoElement infoContent={formData.college} infoTitle="college" />
      <InfoElement infoContent={formData.major} infoTitle="major" />
      <h3 className=" font-bold text-4xl">My Posts</h3>
      {postList
        .filter((post) => post.author.username === formData.username)
        .map((post) => (
          <SmallPost key={post.id} post={post} />
        ))}
      <div className="grid grid-cols-4 px-10 mt-10"></div>
    </div>
  );
};

export default InfoPage;
