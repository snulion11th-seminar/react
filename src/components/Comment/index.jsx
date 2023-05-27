import { useState, useEffect } from "react";
import { CommentElement } from "./CommentElement";
import { getComments } from "../../apis/api";
import { createComment, deleteComment } from "../../apis/api";

export const Comment = ({ postId }) => {
  // TODO 1: comments 불러와서 저장해야겟즤
  const [commentList, setCommentList] = useState([]);
  // TODO 2: comment추가하는 input 관리해줘야겟지
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const getCommentsAPI = async () => {
      const comments = await getComments(postId);
      setCommentList(comments);
    };
    getCommentsAPI();
  }, [postId]);

  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    createComment({ post: postId, content: newComment });
    setNewComment("");
  };

  // TODO 4: commet Delete 하는 함수 만들어죠
  const handleDeleteComment = (id) => {
    deleteComment(id);
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      <div>
        {commentList.map((comment) => {
          return (
            <CommentElement
              key={comment.id}
              comment={comment}
              handleCommentDelete={handleDeleteComment}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-center mt-10 gap-2">
        <form className="w-full" onSubmit={handleCommentSubmit}>
          {/* // TODO 2-3 : comment 추가하는 comment form 만들어주기 */}
          <input
            type="text"
            placeholder="댓글을 입력해주세요"
            id="comment"
            className="input"
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
        </form>
        <button className="button" onClick={handleCommentSubmit}>
          comment
        </button>
      </div>
    </div>
  );
};

export default Comment;
