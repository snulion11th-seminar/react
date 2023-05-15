import { useEffect, useState } from "react";
import CommentElement from "./CommentElement";

export const Comment = ({ comments, createComment, deleteComment }) => {
  // TODO 1: 가짜 comments 불러와서 관리해야겟즤

  // TODO 2: comment추가하는 input 관리해줘야겟지

  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘

  // TODO 4: commet Delete 하는 함수 만들어죠

  const [content, setContent] = useState();

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const addComments = (e) => {
    e.preventDefault();
    createComment(content);
    setContent("");
  };

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      <div>
        {comments.map((comment) => (
          <CommentElement
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
            id={comment.id}
          />
        ))}
      </div>
      <form class="flex items-center justify-center mt-10 gap-2">
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          className="input h-14"
          onChange={handleChange}
          value={content}
        ></input>
        <button onClick={addComments} className="button">
          comment
        </button>
      </form>
    </div>
  );
};
