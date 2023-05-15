import { useEffect, useState } from "react";
import { BigPost } from "../components/Posts";
import posts from "../data/posts";
import { PostForm } from "../components/Form";

const PostCreatePage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  // 화면그리기
  const [formData, setFormData] = useState({
    id: posts.length,
    title: "",
    content: "",
    author: { id: posts.length, username: "베이비" },
    tags: [],
  });

  // 기존 태그 불러오기
  // TODO : api call(get all tags)
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
          <PostForm
						tags={tags}
            onSubmit={onSubmit}
            formData={formData}
						setFormData={setFormData}
          />
        </div>
      )}
    </>
  );
};

export default PostCreatePage;
