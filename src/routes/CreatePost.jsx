import { useState } from "react";
import Comments from "../components/Comments";
import { PostForm } from "../components/form";
import { BigPost } from "../components/Posts";
import posts from "../data/posts";

const CreatePost = () => {
    const [isSubmit, setIsSubmit] = useState(false);
    const [formData, setFormData] = useState({
        id: posts.length + 1,
        title: '',
        content: '',
        summary: '',
        tags: ''
      });

    const onSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleTag = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.split(',') });
    }

   if(!isSubmit) {
    return (
      <div className="flex flex-col items-center">
           <h3 className=" font-bold text-4xl">New Post</h3>
            <PostForm 
               onSubmit={onSubmit} 
               handleChange={handleChange}
               handleTag={handleTag}
               formData
           />
      </div>
     );
  } else {
    return (
        <div className="w-full flex justify-center">
          <div className=" w-1/2 p-8 flex flex-col items-center">

          <BigPost post={formData} />

          <Comments />

          </div>
      </div>
    )
  }
};

export default CreatePost;
