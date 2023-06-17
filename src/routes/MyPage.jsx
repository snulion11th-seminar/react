import { useEffect, useState } from "react";
import { SmallPost } from "../components/Posts";
import {
  getPosts,
  getUserInMyPage,
} from "../apis/api";
import { MyPageForm } from "../components/Form";

const MyPage = () => {
  const [postList, setPostList] = useState([]);
  const [profile, setProfile] = useState({
    id: "",
    user: {},
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

  const [formData, setFormData] = useState(
    {
      email: "",
      username: "",
      college: "",
      major: "",
    }
  );

  useEffect(() => {
    const getProfileAPI = async () => {
      const myProfile = await getUserInMyPage();
      //console.log(myProfile);
      setProfile({
        id: myProfile.id,
        user: myProfile.user,
        college: myProfile.college,
        major: myProfile.major,
      });
    };
    getProfileAPI();
  }, []);

  useEffect(() => {
    setFormData({
      email: profile.user.email,
      username: profile.user.username,
      college: profile.college,
      major: profile.major,
    })
  }, [profile]);

  return (
    <div className="w-3/5 flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center mb-5">
        <div>
          <h1 className="uppercase text-6xl text-white">My Info</h1>
        </div>
      </div>

      <MyPageForm profile = {profile} formData = {formData} setFormData = {setFormData} setProfile = {setProfile}/>

      <div className="grid grid-cols-3 mt-10 gap-x-8 gap-y-4">
        {postList
          .filter(
            (post) =>
              JSON.stringify(post.author.id) === JSON.stringify(profile.user.id)
          )
          .map((post) => (
            <SmallPost key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default MyPage;
