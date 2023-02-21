import { useState } from "react";
import { PostForm } from "../components/form";

const CreatePost = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tag: ''
      });

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
  return (
   <div className="flex flex-col items-center">
        <h3 className=" font-bold text-4xl">New Post</h3>
         <PostForm 
            onSubmit={onSubmit} 
            handleChange={handleChange}
            formData={formData}
        />
   </div>
  );
};

export default CreatePost;
