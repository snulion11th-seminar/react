import { useEffect, useState } from "react";
import CommentElement from "./CommentElement";
import { createComment, deleteComment, getComments } from "../../apis/api";

const Comment = ({ postId }) => {
  const [commentList, setCommentList] = useState([]); // state for comments
  const [newContent, setNewContent] = useState(""); // state for new comment

  useEffect(() => {
    const getCommentsAPI = async () => {
      const comments = await getComments(postId);
      setCommentList(comments);
    };
    getCommentsAPI();
  }, [postId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setNewContent("");
    createComment({ post: postId, content: newContent });
  };

  const handleCommentDelete = (targetId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteComment(targetId);
    }
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      {commentList.map((comment) => {
        return (
          <div className="w-full flex flex-row" key={comment.id}>
            <CommentElement
              comment={comment}
              handleCommentDelete={handleCommentDelete}
            />
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
  );
};

export default Comment;
