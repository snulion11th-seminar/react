import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import { BigPost } from "../components/Posts";
import { PostForm } from "../components/Form";
import posts from "../data/posts";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    setPost(post);
    setFormData(post);
  }, [postId]);

  const onSubmit = (e) => {
    e.preventDefault();
    setPost(formData);
    setEdit(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTag = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.split(",") });
  };

  return (
    post && (
      <div className="w-full flex justify-center">
        {edit ? (
          <PostForm
            formData={formData}
            onSubmit={onSubmit}
            handleChange={handleChange}
            handleTag={handleTag}
          />
        ) : (
          <div className="p-8 flex flex-col items-center">
            <BigPost post={post} />
            <Comments />
            <button
              onClick={() => setEdit(true)}
              className="button mt-10 py-2 px-10"
            >
              edit
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default PostDetail;
