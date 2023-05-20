import { useEffect, useState } from "react";

const CommentElement = ({ comment, deleteComment }) => {
  // TODO : props 받기
  const [content, newContent] = useState(comment.content);
  const [commentTime, setCommentTime] = useState(comment.created_at);
  // TODO : 수정하는 input 내용 관리
  const [editComment, setEditComment] = useState(false);
  const [editedComment, setEditedComment] = useState(false);
  // comment created_at 전처리
  const date = new Date(commentTime);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;
  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-3/4">
        {editComment ? (
          <input
            className="input"
            value={content}
            onChange={(e) => {
              newContent(e.target.value);
              setCommentTime(new Date());
              setEditedComment(true);
            }}
          />
        ) : (
          <p className="text-lg">{content}</p>
        )}
        {editedComment ? (
          <p className="text-gray-500 text-sm">
            <i>Edited</i>
          </p>
        ) : null}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
      </div>
      <div className="w-1/4 flex flex-row justify-between items-center">
        <span className="text-gray-400 text-sm">{comment.author.username}</span>
        {editComment ? (
          <button onClick={() => setEditComment(false)}> Done </button>
        ) : (
          <div className="flex gap-3">
            <button onClick={() => setEditComment(true)}>Edit</button>
            <button onClick={() => deleteComment(comment)}>Del</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentElement;
