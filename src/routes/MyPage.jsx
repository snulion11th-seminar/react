import { useState, useEffect } from "react";
import { MyInfoElement } from "../routes/MyPageElement";
import { getMyInfo, getPosts } from "../apis/api";
import { SmallPost } from "../components/Posts";

const MyPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");
  const [postList, setPostList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
      console.log(posts);
    };
    getPostsAPI();
  }, []);


  useEffect(() => {
    const getInfoAPI = async () => {
      const info = await getMyInfo();
      setEmail(info.user.email);
      setUsername(info.user.username);
      setCollege(info.college);
      setMajor(info.major);
      setUser(info.user);
    };
    getInfoAPI();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-1/3">
        <h3 className=" font-bold text-4xl mb-10">My Info</h3>
        <MyInfoElement infoLabel="email" infoContent={email}/>
        <MyInfoElement infoLabel="username" infoContent={username}/>
        <MyInfoElement infoLabel="college" infoContent={college}/>
        <MyInfoElement infoLabel="major" infoContent={major}/>
      </div>
      <div className="flex flex-col items-center mb-20 w-2/3">
        <h3 className=" font-bold text-4xl mt-10 mb-10">My Posts</h3>
        <div className="grid grid-cols-2 px-10 gap-5">
          {postList
            .filter((post) => 
              post?.author.id === user?.id
          ).map((post) => (
            <SmallPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyPage;