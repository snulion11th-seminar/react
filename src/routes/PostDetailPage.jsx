import { useEffect, useState } from "react";
import { useNavigation, useParams } from "react-router-dom";
import { BigPost } from "../components/Posts";
import { Comment } from "../components/Comment/index";
import { Link } from "react-router-dom";
import posts from "../data/posts";
import { deletePost, getComments } from "../apis/api";
import { getPost, getUser } from "../apis/api";
import { getCookie } from "../utils/cookie";
import { useNavigate } from "react-router-dom";

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [comment, setComment] = useState();
  const [user, setUser] = useState();
  
  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    setPost(post);
  }, [postId]);

  useEffect(() => {
    const getPostAPI = async () => {
      const post = await getPost(postId);
      setPost(post);
    }
    getPostAPI();
  },[postId]);
  console.log(postId);

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
  const onClickDelete = () => {
    deletePost(postId, navigate);

  };
  console.log("delete");

  return (
    post && (
      <div className="flex flex-col items-center w-3/5 p-8">
        {/* post detail component */}
        <BigPost post={post} />
        <Comment 
        postId={postId} />
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
				{/* 수정 */}
      </div>
    )
  );
};

export default PostDetailPage;
