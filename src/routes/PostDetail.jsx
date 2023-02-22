import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import { BigPost } from "../components/Posts";
import posts from "../data/posts";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    setPost(post)
  }, [postId]);

  return post && (
    <div className="w-full flex justify-center">
      <div className=" w-1/2 p-8 flex flex-col items-center">

      <BigPost post={post} />

      <Comments />

      </div>
    </div>
  )
};

export default PostDetail;
