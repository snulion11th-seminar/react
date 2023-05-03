import { useState } from "react";
import { useParams } from "react-router-dom";
import { PostForm } from "../components/Form";
import posts from "../data/posts";
import { Link } from "react-router-dom";
import { BigPost } from "../components/Posts";

const EditPost = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { postId } = useParams();
  const [formData, setFormData] = useState(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    return {
      ...post,
      tags: post.tags.map((tag) => tag.content),
    };
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleTag = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.split(",") });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    formData.tags = formData.tags.join()
      ? formData.tags.map((tag, idx) => {
          return { id: idx, content: tag };
        })
      : null;
    formData.like_users = [];
    setIsSubmitted(true);
  };

  return (
    <>
      {isSubmitted ? (
        <div className="flex flex-col items-center w-3/5 p-8">
          <BigPost post={formData} />
          {/* <Comments /> */}
        </div>
      ) : (
        <div className="flex flex-col items-center w-3/5">
          <div className="flex w-full items-center">
            <Link to={`/${postId}`}>
              <button className="w-20">{`< Back`}</button>
            </Link>
            <h3 className="flex-1 font-bold text-4xl">Edit Post</h3>
          </div>
          <PostForm
            onSubmit={(e) => onSubmit(e)}
            handleChange={handleChange}
            handleTag={handleTag}
            formData={formData}
          />
        </div>
      )}
    </>
  );
};

export default EditPost;
