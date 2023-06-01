import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SmallPost } from "../components/Posts";
import { MyPageInput } from "../components/EditInput";

import { Link } from "react-router-dom";
import { getPosts, getUser, getMyPage } from "../apis/api";
import { getCookie } from "../utils/cookie";

const MyPage = () => {
  const [userProfile, setUserProfile] = useState();

  const [tags, setTags] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    if (getCookie("access_token")) {
      const getMyPageAPI = async () => {
        const userProfile = await getMyPage();
        setUserProfile(userProfile);
      };
      const getPostsAPI = async () => {
        const posts = await getPosts();
        setPostList(posts);
      };
      getPostsAPI();
      getMyPageAPI();
    }
  }, []);

  return (
    <div>
      {userProfile && (//userProfile을 안 받아왔을 때에 대한 처리.
        <>
          <MyPageInput content={userProfile}></MyPageInput>
        </>
      )}
      <div className="w-full flex-row">
      {postList.filter((post) =>
        post.author.id === userProfile.user.id
      )
      .map((post) => (
        <SmallPost key={post.id} post={post} />
      ))
      }
      </div>
    </div>
  );
};

export default MyPage;
