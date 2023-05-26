import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BigPost } from "../components/Posts";
import { Comment } from "../components/comment";
import { getPost, getUser, deletePost } from "../apis/api";
import { getCookie } from "../utils/cookie";

const PostDetailPage = () => {
  // parameter로 받은 id에 해당하는 post를 찾아서 넣자
  // TODO : api call(get post by id)
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [user, setUser] = useState({ id: null });
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
    if (window.confirm("삭제?")) {
      deletePost(postId);
    }
  };

  return (
    post && (
      <div className="flex flex-col items-center w-3/5 p-8">
        {/* post detail component */}
        <BigPost post={post} />
        <Comment postId={postId} />
        <div>
          {user.id === post.author.id ? (
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
