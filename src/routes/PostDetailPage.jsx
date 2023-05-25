import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BigPost } from "../components/Posts";
import { Link } from "react-router-dom";
import posts from "../data/posts";
import Comment from "../components/Comment";
import { getPost, getUser } from "../apis/api";
import { getCookie } from "../utils/cookie";
import { deletePost } from "../apis/api";

// 수정

const PostDetailPage = () => {
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

  useEffect(() => {
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        const user = await getUser();
        setUser(user);
      };
      getUserAPI();
    }
  }, []);

  const onClickDelete = async () => {
    const confirmed = window.confirm("삭제할꼬얌?");
    if (confirmed) {
      try {
        const success = await deletePost(post.id);
        if (success) {
          console.log("Post deleted successfully");
        } else {
          console.log("[ERROR] Error while deleting post");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
      window.location.href = "/";
    }
  };

  console.log(user);
  console.log(post);
  console.log(user?.id);
  console.log(post?.author?.user_id);
  console.log(post?.author?.id);

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
        </div>
      </div>
    )
  );
};

export default PostDetailPage;
