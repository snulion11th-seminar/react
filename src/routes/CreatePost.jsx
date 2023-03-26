import { useState } from "react";
import Comments from "../components/Comments";
import { PostForm } from "../components/Form";
import { BigPost } from "../components/Posts";
import posts from "../data/posts";

const CreatePost = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState({
    id: posts.length + 1,
    title: "",
    content: "",
    creator: "아기사자",
    tags: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTag = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.split(",") });
  };

  return (
    <>
      {isSubmit ? (
        <div className="flex flex-col items-center w-3/5 p-8">
          <BigPost post={formData} />
          <Comments />
        </div>
      ) : (
        <div className="flex flex-col items-center w-3/5">
          <h3 className="font-bold text-4xl">New Post</h3>
          <PostForm
            onSubmit={onSubmit}
            handleChange={handleChange}
            handleTag={handleTag}
            formData={formData}
          />
        </div>
      )}
    </>
  );
};

export default CreatePost;
