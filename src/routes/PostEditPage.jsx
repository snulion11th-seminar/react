import { useEffect, useState } from "react";
import { BigPost } from "../components/Posts";
import { PostForm } from "../components/Form";
import { useParams, Link } from "react-router-dom";
import { getPost, getTags, updatePost } from "../apis/api";
import { useNavigate } from "react-router-dom";

const PostEditPage = () => {
  const { postId } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  // 화면그리기
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
  });
  useEffect(() => {
    const getPostAPI = async () => {
      const post = await getPost(postId);
      const postFormData = {
        ...post,
        tags: post.tags.map((tag) => tag.content),
      };
      setFormData(postFormData);
    };
    getPostAPI();
  }, [postId]);

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
    updatePost(postId, formData, navigate);
  };

  return (
    <div className="flex flex-col items-center w-3/5">
      <h3 className="font-bold text-4xl">New Post</h3>
      <div className="flex w-full items-center">
        <Link to={`/${postId}`}>
          <button className="w-20">{`< Back`}</button>
        </Link>
        <h3 className="flex-1 font-bold text-4xl">Edit Post</h3>
      </div>
      <PostForm
        tags={tags}
        onSubmit={onSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default PostEditPage;
