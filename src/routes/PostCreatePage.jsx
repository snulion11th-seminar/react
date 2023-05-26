import { useEffect, useState } from "react";
import { BigPost } from "../components/Posts";
import posts from "../data/posts";
import { PostForm } from "../components/Form/Index";
import { getTags } from "../apis/api";
import { createPost } from "../apis/api";
import { useNavigate } from "react-router-dom";
const PostCreatePage = () => {
  // 화면그리기
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
  });

  // 기존 태그 불러오기
  // TODO : api call(get all tags)
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getTagsAPI = async () => {
      const tags = await getTags();
      const tagContents = tags.map((tag) => {
        return tag.content;
      });
      setTags(tagContents);
    };
    getTagsAPI();
  }, []);

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    createPost(formData, navigate);
  };

  return (
    <div className="flex flex-col items-center w-3/5">
      <h3 className="font-bold text-4xl">New Post</h3>
      <PostForm
        tags={tags}
        onSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default PostCreatePage;
