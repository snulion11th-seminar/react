import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostForm } from "../components/Form";
import posts from "../data/posts";
import { Link } from "react-router-dom";
import { BigPost } from "../components/Posts";

const PostEditPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { postId } = useParams();
  const [formData, setFormData] = useState({});

  // 기존 post 불러오기
  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    const postFormData = { ...post, tags: post.tags.map((tag) => tag.content) };
    setFormData(postFormData);
  }, [postId]);

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
