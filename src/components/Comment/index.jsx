import { useState } from "react";
import comments from "../../data/comments";
import CommentElement from "./CommentElement";

const Comment = () => {
  const [commentList, setCommentList] = useState(comments);
  const [newContent, setNewContent] = useState("");
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: commentList.length + 1,
      content: newContent,
      liked_users: [],
      created_at: Date.now(),
      author: {
        id: 1,
        username: "username",
      },
    };
    setCommentList([...commentList, newComment]);
    setNewContent("");
  };
  const handleCommentDelete = (targetId) => {
    setCommentList(commentList.filter((comment) => comment.id !== targetId));
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      {commentList.map((comment) => (
        <CommentElement
          comment={comment}
          handleCommentDelete={handleCommentDelete}
        />
      ))}

      <form
        className="flex flex-row items-center justify-center "
        onSubmit={handleCommentSubmit}
      >
        <input
          required
          type="text"
          placeholder="Type Content.."
          id="content"
          value={newContent}
          className="input"
          onChange={(e) => setNewContent(e.target.value)}
        />
        <button className="button  mx-4 py-2 px-10 item-center justify-center">
          Comment
        </button>
      </form>
    </div>
  );
};

export default Comment;
