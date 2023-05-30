<<<<<<< HEAD
import { useState } from "react";
import comments from "../../data/comments";
import CommentElement from "./CommentElement";

const Comment = () => {
  // TODO 1: 가짜 comments 불러와서 관리해야겟즤

  // TODO 2: comment추가하는 input 관리해줘야겟지

  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘

  // TODO 4: commet Delete 하는 함수 만들어죠
  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      // commentElement // <CommentElement /> 가 comment마다 반복시켜야즤
      <form>// TODO 2-3 : comment 추가하는 comment form 만들어주기</form>
=======
import { useEffect, useState } from "react";
import CommentElement from "./CommentElement";
import { createComment, getComments, deleteComment } from "../../apis/api";

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

  // 과제!!
  const handleDeleteComment = (id) => {
    deleteComment(id);
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      {commentList.map((comment) => {
        return (
          <div className="w-full flex flex-row" key={comment.id}>
            <CommentElement
              comment={comment}
              handleCommentDelete={handleDeleteComment}
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
>>>>>>> donghyun
    </div>
  );
};

export default Comment;
