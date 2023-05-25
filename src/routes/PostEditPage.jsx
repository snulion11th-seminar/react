import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "../components/Form";
import { Link } from "react-router-dom";
import { getPost, getTags, updatePost, createTag } from "../apis/api";

const PostEditPage = () => {
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getPostAPI = async () => {
      const post = await getPost(postId);
      const postFormData = {
        title: post.title,
        content: post.content,
        tags: post.tags?.map((tag) => tag.content) || [],
      };
      setFormData(postFormData);
    };
    getPostAPI();
  }, [postId]);

  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await getTags();
        const tagContents = tagsData?.map((tag) => ({
          id: tag.id,
          content: tag.content,
        }));
        setTags(tagContents);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchTags();
  }, []);

  const handleCreateTag = async (tagContent) => {
    try {
      const newTag = await createTag({ content: tagContent });
      setTags((prevTags) => [...prevTags, newTag]);
      console.log("Tag created successfully");
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updatePost(postId, formData, navigate);
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
        setTags={setTags} // Pass the setTags function to the PostForm component
        formData={formData}
        setFormData={setFormData}
        handleCreateTag={handleCreateTag} // Pass the handleCreateTag function to the PostForm component
      />
    </div>
  );
};

export default PostEditPage;
