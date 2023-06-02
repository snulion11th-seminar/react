import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BigPost } from "../components/Posts";
import { Link } from "react-router-dom";
import { getPost, getUser, deletePost } from "../apis/api";
import { getCookie } from "../utils/cookie";
import { useNavigate } from "react-router-dom";

import Comment from "../components/Comment";

const PostDetailPage = () => {
  // parameter로 받은 id에 해당하는 post를 찾아서 넣자
  // TODO : api call(get post by id)
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [user, setUser] = useState();
  // user의 정보를 담아둘 수 있기 위해서

  useEffect(() => {
    const getPostAPI = async () => {
      const post = await getPost(postId);
      setPost(post);
    };
    getPostAPI();
  }, [postId]);

  // 추가
  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        const user = await getUser();
        setUser(user.user);
      };
      getUserAPI();
    }
  }, []);
  // 처음 한번만 실행

  const navigate = useNavigate();
  const onClickDelete = () => {
    deletePost(postId, navigate);
  }; 


  return (
    post && (
      <div className="flex flex-col items-center w-3/5 p-8">
        {/* post detail component */}
        <BigPost post={post} />
        <Comment postId={postId} />

        <div>
          {user?.id === post?.author.id ? (
            <>
              <Link to={`/${post.id}/edit`}>
                <button className="button mt-10 mx-4 py-2 px-10">Edit</button>
              </Link>
              <button
                className="button mt-10 mx-4 py-2 px-10"
                onClick={onClickDelete}
              >
                Delete
              </button>
            </>
          ) : null}
          {/* user와 post.author가 동일하면 버튼을 리턴, 아니면 null */}
        </div>
      </div>
    )
  );
};

export default PostDetailPage;
