import { useState, useEffect } from "react";
import { getUser, getPosts } from "../apis/api";
import { ProfileEditForm } from "../components/Form";
import { SmallPost } from "../components/Posts";

const MyPage = () => {
  const [refresh, setRefresh] = useState(false);
  const [postList, setPostList] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });
  const user = getUser();

  useEffect(() => {
    const getUserAPI = async () => {
      const user = await getUser();
      const userFormData = {
        ...user,
        email: user.user.email,
        username: user.user.username,
        college: user.college,
        major: user.major,
      };
      setFormData(userFormData);
    };
    getUserAPI();
  }, [refresh]);

  useEffect(() => {
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostsAPI();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center w-1/2">
        <h3 className=" font-bold text-4xl">My Info</h3>
        <ProfileEditForm
          formData={formData}
          setFormData={setFormData}
          refresh={refresh}
          setRefresh={setRefresh}
          datainfo={"email"}
          datatype={"email"}
        />
        <ProfileEditForm
          formData={formData}
          setFormData={setFormData}
          refresh={refresh}
          setRefresh={setRefresh}
          datainfo={"username"}
          datatype={"text"}
        />
        <ProfileEditForm
          formData={formData}
          setFormData={setFormData}
          refresh={refresh}
          setRefresh={setRefresh}
          datainfo={"college"}
          datatype={"text"}
        />
        <ProfileEditForm
          formData={formData}
          setFormData={setFormData}
          refresh={refresh}
          setRefresh={setRefresh}
          datainfo={"major"}
          datatype={"text"}
        />
      </div>
      <div className="flex flex-col items-center w-1/2 mt-5">
        <h3 className=" font-bold text-4xl">My Posts</h3>
        <div className="grid grid-cols-2 px-10 mt-10">
          {postList
            .filter((post) => post.author_id === user.id)
            .map((post) => (
              <SmallPost key={post.id} post={post} />
            ))}
        </div>
      </div>
    </>
  );
};

export default MyPage;
