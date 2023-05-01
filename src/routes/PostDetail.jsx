import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentElement from "../components/CommentElement";
import { BigPost } from "../components/Posts";
import { PostForm } from "../components/Form";
import posts from "../data/posts";
import comments from "../data/comments";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState(null);

  const [commentList, setCommentList] = useState(comments); // state for comments
  const [newContent, setNewContent] = useState(""); // state for new comment

  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    setFormData(post);
    setPost(post);
  }, [postId]);

  const onSubmit = (e) => {
    e.preventDefault();
    setPost(formData);
    setEdit(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTag = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.split(",") });
  };
  
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      id: commentList.length,
      content: newContent,
      like_users: [],
      author: 1,
      created_at: Date.now(),
    };
    // add api call for creating new comment here

    setNewContent("");
    setCommentList([...commentList, newComment]);
  };

  const handleCommentDelete = (targetId) => {
    setCommentList(commentList.filter((comment) => comment.id !== targetId));
  }

  return (
    post && (
      <>
        {edit ? (
          <div className="flex flex-col w-3/5">
            <button
              className="button w-28"
              onClick={() => {
                setEdit(false);
                setFormData(post);
              }}
            >
              Back
            </button>
            <div className="flex flex-col items-center">
              <PostForm
                formData={formData}
                onSubmit={onSubmit}
                handleChange={handleChange}
                handleTag={handleTag}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center w-3/5 p-8">
            {/* post detail component */}
            <BigPost post={post} />
            {/* comment list component */}
            <div className="w-full mt-5 self-start">
              <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
              {commentList.map((comment) => {
                return (
                  <div className="w-full flex flex-row" key={comment.id} >
                    <CommentElement comment={comment} />
                    <button className="small-button" onClick={() => handleCommentDelete(comment.id)}>삭제</button>
                  </div>
                  
                );
              })}
              {/* comment form component */}
              <form
                className="flex items-center justify-center mt-10 gap-2"
                onSubmit={handleCommentSubmit}
              >
                <input
                  type="text"
                  value={newContent}
                  placeholder="댓글을 입력해주세요"
                  className="input h-14"
                  onChange={(e) => setNewContent(e.target.value)}
                />
                <button type="submit" className="button">
                  comment
                </button>
              </form>
            </div>
            <button
              onClick={() => setEdit(true)}
              className="button mt-10 py-2 px-10"
            >
              Edit
            </button>
          </div>
        )}
      </>
    )
  );
};

export default PostDetail;
