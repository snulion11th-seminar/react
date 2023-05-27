import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostForm } from "../components/Form";
import { Link } from "react-router-dom";
import { getPost, getTags, updatePost } from "../apis/api";
import { useNavigate } from "react-router-dom";

const PostEditPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { postId } = useParams();
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
      <div className="flex w-full items-center">
        <Link to={`/${postId}`}>
          <button className="w-20">{`< Back`}</button>
        </Link>
        <h3 className="flex-1 font-bold text-4xl">Edit Post</h3>
      </div>
      <PostForm
        onSubmit={onSubmit}
        tags={tags}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default PostEditPage;
