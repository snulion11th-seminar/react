import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostForm } from "../components/Form";
import posts from "../data/posts";
import { Link } from "react-router-dom";
import { BigPost } from "../components/Posts";
import { getPost, getTags, updatePost } from "../apis/api";
import { useNavigate } from "react-router-dom";

const PostEditPage = () => {
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

  // 기존 post 불러오기
  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    const postFormData = { ...post, tags: post?.tags.map((tag) => tag.content) };
    setFormData(postFormData);
  }, [postId]);

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