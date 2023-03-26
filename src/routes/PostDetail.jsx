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
    setFormData(post);
    setPost(post);
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
      <>
        {edit ? (
          <div className="flex flex-col w-3/5">
            <button
              className="button w-28"
              onClick={() => {
                setEdit(false);
                setFormData(post);
              }}
            >
              Back
            </button>
            <div className="flex flex-col items-center">
              <PostForm
                formData={formData}
                onSubmit={onSubmit}
                handleChange={handleChange}
                handleTag={handleTag}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-3/5 p-8">
            <BigPost post={post} />
            <Comments />
            <button
              onClick={() => setEdit(true)}
              className="button mt-10 py-2 px-10"
            >
              Edit
            </button>
          </div>
        )}
      </>
    )
  );
};

export default PostDetail;
