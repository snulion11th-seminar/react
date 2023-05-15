import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BigPost } from "../components/Posts";
import posts from "../data/posts";
import { PostForm } from "../components/Form";
import { Link } from "react-router-dom";

const PostEditPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { postId } = useParams();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    const postFormData = { ...post, tags: post.tags.map((tag) => tag.content) };
    setFormData(postFormData);
  }, [postId]);

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
    console.log(formData);

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
      )}
    </>
  );
};

export default PostEditPage;
