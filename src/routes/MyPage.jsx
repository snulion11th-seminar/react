import { useState, useEffect } from "react";
import { getCookie } from "../utils/cookie";
import { getUserProfile, getPosts } from "../apis/api";
import { MyPageComponent } from "../components/Form/MyPageComponent";
import { SmallPost } from "../components/Posts";

const MyPage = () => {
  const [userPosts, setUserPosts] = useState([]); // [post1, post2, ...
  const [userProfileInfo, setUserProfileInfo] = useState(null);

  useEffect(() => {
    if (getCookie("access_token")) {
      const getUserProfileAPI = async () => {
        const userProfile = await getUserProfile();
        setUserProfileInfo(userProfile);
      };
      getUserProfileAPI();
    }
  }, []);

  useEffect(() => {
    // userProfileInfo를 받아오는게 완료되면 post 가져옴
    if (userProfileInfo) {
      const getPostsAPI = async () => {
        const allPosts = await getPosts();
        setUserPosts(
          allPosts.filter((post) => post.author.id === userProfileInfo.user.id)
        );
      };
      getPostsAPI();
    }
  }, []);

  return (
    <div className="flex flex-col items-center w-3/5 p-8">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-4xl font-bold">My Page</h1>
        <>
          {userProfileInfo && (
            <>
              <MyPageComponent
                dataInfo={"email"}
                userProfileInfo={userProfileInfo}
                setUserProfileInfo={setUserProfileInfo}
              />
              <MyPageComponent
                dataInfo={"username"}
                userProfileInfo={userProfileInfo}
                setUserProfileInfo={setUserProfileInfo}
              />
              <MyPageComponent
                dataInfo={"college"}
                userProfileInfo={userProfileInfo}
                setUserProfileInfo={setUserProfileInfo}
              />
              <MyPageComponent
                dataInfo={"major"}
                userProfileInfo={userProfileInfo}
                setUserProfileInfo={setUserProfileInfo}
              />
            </>
          )}
        </>
        {userPosts.length > 0 &&
          userPosts.map((post) => <SmallPost post={post} />)}
      </div>
    </div>
  );
};

export default MyPage;
