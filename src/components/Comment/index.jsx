import { useState } from "react";
import comments from "../../data/comments";
import CommentElement from "./CommentElement";

export const Comment = () => {
  // TODO 1: 가짜 comments 불러와서 관리해야겟즤
  const [commentList, setCommentList] = useState(comments);
  // TODO 2: comment추가하는 input 관리해줘야겟지
  const [commentInput, setCommentInput] = useState("");
  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘
  const  commentSubmit = (e) => {
    e.nativeEvent.preventDefault();

    const newComment = {
      created_at: new Date().toDateString(),
      id: commentList.length + 1,
      content: commentInput,
    };
  
    setCommentList((prevComments) => [...prevComments, newComment]);
    setCommentInput("");
  };
  // TODO 4: commet Delete 하는 함수 만들어죠
  const commentDelete = (id) => {
    const deletedCommentList = commentList.filter(
      (comment) => comment.id !== id
    );
    setCommentList([...deletedCommentList]);
  };
  
  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      {commentList.map((comment) => (
        <CommentElement
          key={comment.id}
          comment={comment}
          commentDelete={commentDelete}
        />
      ))}
      <form
        className="flex items-center justify-center mt-10 gap-2"
        onSubmit={commentSubmit}
      >
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          className="input w-full mx-1 py-4 px-5 mt-10 mb-3"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        ></input>
        <button type="submit" className="button mx-1 py-4 px-5 mt-10 mb-3">
          comment
        </button>
      </form>
    </div>
  );
};

//export default Comment;
