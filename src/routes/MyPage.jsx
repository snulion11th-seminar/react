import { useState, useEffect } from "react";
import { getUser, getPosts } from "../apis/api";
import { ProfileEditForm } from "../components/Form";
import { SmallPost } from "../components/Posts";

const MyPage = () => {
  const [refresh, setRefresh] = useState(false);
  /* 변경 취소 시 기존 값으로 돌려놓기 위한 state */
  const [postList, setPostList] = useState([]);
  const [userID, setUserID] = useState("");
  /* 로그인한 유저 정보를 가져오는 state */
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    college: "",
    major: "",
  });
  /* mypage edit 창에 뜨는 정보 */

  useEffect(() => {
    const getUserAPI = async () => {
      const user = await getUser();
      setUserID(user.id);
    };
    getUserAPI();
  }, []);
  /* 로그인 ID를 가져오는 effect */

  useEffect(() => {
    /* postList를 가져오는 effect */
    const getPostsAPI = async () => {
      const posts = await getPosts();
      setPostList(posts);
    };
    getPostsAPI();
  }, []);

  useEffect(() => {
    const setUserAPI = async () => {
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
    setUserAPI();
  }, [refresh]);
  /* refresh 상태가 변할 때마다 formData에 데이터베이스 정보 가져오기 */

  /* /components/Form 에 정의된 form에 각 항목 props로 넘겨주기 */
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
            .filter((post) => post.author.id === userID)
            .map((post) => (
              <SmallPost key={post.id} post={post} />
            ))}
        </div>
      </div>
    </>
  );
};

export default MyPage;
