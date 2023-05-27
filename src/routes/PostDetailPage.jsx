import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BigPost } from "../components/Posts";
import { Link } from "react-router-dom";
import posts from "../data/posts";
import Comment from "../components/Comment";
import { getPost, getUser } from "../apis/api";
import { getCookie } from "../utils/cookie";
import { deletePost } from "../apis/api";

const PostDetailPage = () => {
  // parameter로 받은 id에 해당하는 post를 찾아서 넣자
  // TODO : api call(get post by id)
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const getPostAPI = async () => {
      const post = await getPost(postId);
      setPost(post);
    };
    getPostAPI();
  }, [postId]);
  // 작성했던 getPost()를 호출한 후, setPostList를 통해 postList에 저장
  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    setPost(post);
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

  const navigate = useNavigate();

  const onClickDelete = async () => {
    // add api call for deleting post here
    const confirmDelete = window.confirm("정말로 게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
      await deletePost(postId, navigate);
      //navigate("/");
    }
    // add redirect to home page
  };

  return (
    post && (
      <div className="flex flex-col items-center w-3/5 p-8">
        {/* post detail component */}
        <BigPost post={post} />
        <div className="w-full">
          <Comment postId={postId} />
        </div>
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
