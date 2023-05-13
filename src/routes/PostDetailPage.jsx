import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import { BigPost } from "../components/Posts";
import { Link } from "react-router-dom";
import { getPost } from "../apis/api";

const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const getPostAPI = async () => {
      const post = await getPost(postId);
      setPost(post);
    };
    getPostAPI();
  }, [postId]);

  const onClickDelete = () => {
    console.log("delete");
    // add api call for deleting post here
    // add redirect to home page
  };

  return (
    post && (
      <div className="flex flex-col items-center w-3/5 p-8">
        {/* post detail component */}
        <BigPost post={post} />

        {/* comments component */}
        <Comment postId={postId} />

        <div>
          <Link to={`/${post.id}/edit`}>
            <button className="button mt-10 mx-4 py-2 px-10">Edit</button>
          </Link>
          <button
            className="button mt-10 mx-4 py-2 px-10"
            onClick={onClickDelete}
          >
            Delete
          </button>
        </div>
      </div>
    )
  );
};

export default PostDetailPage;
