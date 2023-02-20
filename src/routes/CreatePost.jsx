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
   <div>
        <div>CreatePost</div>
         <PostForm 
            onSubmit={onSubmit} 
            handleChange={handleChange}
            formData={formData}
        />
   </div>
  );
};

export default CreatePost;
