import { useState, useEffect } from "react";
import { getCookie } from "../utils/cookie";
import { getUser, getPosts } from "../apis/api";
import MyPageForm from "../components/MyPageForm";
import { SmallPost } from "../components/Posts";

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [keys, setKeys] = useState([]);
  const [postList, setPostList] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        const user = await getUser();
        //user 정보에 담겨온 id는 userId에 넣음
        setUserId(user.id);
        const {
          college,
          major,
          user: { email, username },
        } = user;
        // 마이페이지 구성에 필요한 정보만 modifiedUser에 담음
        // modifiedUser는 다음과 같은 형식으로 들어옴-> {email: email.com, username: testuser, college: snu, major: kll}
        const modifiedUser = { email, username, college, major };
        setUser(modifiedUser);
      };
      getUserAPI();
    }
  }, []);

  //getUserAPI로 들어온 정보에 담긴 유저가 작성한 post만 남겨서 filteredPosts에 넣음
  useEffect(() => {
    const fetchPosts = async () => {
      if (userId) {
        const posts = await getPosts();
        const filteredPosts = posts.filter((post) => post.author.id === userId);
        setPostList(filteredPosts);
      }
    };

    fetchPosts();
  }, [userId]);

  //getUserAPI에서 들어온 유저 관련 정보에서 key만 뽑아서 keys에 담음 (하위 컴포넌트에게 넘겨주기 위해)
  useEffect(() => {
    if (user) setKeys(Object.keys(user));
  }, [user]);

  // keys(email, username, college, major)를 돌면서 각각을 하위 컴포넌트에 type으로 전달, 각 key에 대응되는 값은 propValue로 넘겨줌
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-6xl font-bold text-white mb-10">My Info</h1>
      {keys.map((key, idx) => {
        return <MyPageForm key={idx} type={key} propValue={user[key]} />;
      })}
      <h1 className="text-6xl font-bold text-white mb-10 mt-10">My Posts</h1>
      <div className="flex">
        {postList.map((post, idx) => {
          return <SmallPost key={idx} post={post} />;
        })}
      </div>
    </div>
  );
};

export default MyPage;
