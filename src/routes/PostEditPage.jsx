import { useEffect, useState } from "react";
import { BigPost } from "../components/Posts";
import { PostForm } from "../components/Form";
import { useParams, Link } from "react-router-dom";
import posts from "../data/posts";

const PostEditPage = () => {
  const { postId } = useParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  // 화면그리기
  const [formData, setFormData] = useState({
    id: posts.length,
    title: "",
    content: "",
    author: { id: posts.length, username: "베이비" },
    tags: [],
  });
  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    const postFormData = { ...post, tags: post.tags.map((tag) => tag.content) };
    setFormData(postFormData);
  }, [postId]);

  const [tags, setTags] = useState([]);
  useEffect(() => {
    const duplicatedTagList = posts.reduce((acc, post) => {
      for (let tag of post.tags) {
        acc.add(tag.content);
      }

      return acc;
    }, new Set());

    const tagList = [...duplicatedTagList];

    setTags([...tagList]);
  }, []);

  const onSubmit = (e) => {
    //TODO : api connect
    e.preventDefault();

    const createdPost = {
      ...formData,
      like_users: [],
      tags: formData.tags.map((tag, idx) => {
        return { id: idx + 1, content: tag };
      }),
    };
    setFormData(createdPost);
    setIsSubmitted(true);
  };

  return (
    <>
      {isSubmitted ? (
        <div className="flex flex-col items-center w-3/5 p-8">
          <BigPost post={formData} />
        </div>
      ) : (
        <div className="flex flex-col items-center w-3/5">
          <h3 className="font-bold text-4xl">New Post</h3>
          <div className="flex w-full items-center">
            <Link to={`/${postId}`}>
              <button className="w-20">{`< Back`}</button>
            </Link>
            <h3 className="flex-1 font-bold text-4xl">Edit Post</h3>
          </div>
          {/* 수정 👇🏻 */}
          <PostForm
            tags={tags}
            onSubmit={onSubmit}
            formData={formData}
            setFormData={setFormData}
          />
          {/* 수정 👆🏻 */}
        </div>
      )}
    </>
  );
};

export default PostEditPage;
