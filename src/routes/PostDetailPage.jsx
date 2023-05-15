import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import { BigPost } from "../components/Posts";
import { Link } from "react-router-dom";
import { deletePost, getPost, getUser } from "../apis/api";
import { getCookie } from "../utils/cookie";

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getPostAPI = async () => {
      const post = await getPost(postId);
      setPost(post);
    };
    getPostAPI();
  }, [postId]);

  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        const user = await getUser();
        setUser(user);
      };
      getUserAPI();
    }
  }, []);

  const onClickDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deletePost(postId, navigate);
    }
  };

  return (
    post && (
      <div className="flex flex-col items-center w-3/5 p-8">
        {/* post detail component */}
        <BigPost post={post} />

        {/* comments component */}
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
        </div>
      </div>
    )
  );
};

export default PostDetailPage;
