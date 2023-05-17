import React, { useState } from "react";
const CommentElement = (props) => {
  // TODO : props 받기
  // TODO : 수정하는 input 내용 관리
  const { comment, handleCommentDelete } = props;
  const [content, setContent] = useState(comment.content);
  const [isEditing, setIsEditing] = useState(false);
  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;
  return (
    <div className="w-full flex flex-row justify-between gap-1 mb-2">
      <div className="w-3/4">
        {isEditing ? (
          <input
            className="input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p>{content}</p>
        )}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
        <div className="w-1/4 flex flex-row-reverse items-center"></div>
      </div>
      <div>
        {" "}
        <button className="mr-3" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Done" : "Edit"}
        </button>
        <button
          className="small-button"
          onClick={() => handleCommentDelete(comment.id)}
        >
          {isEditing ? "" : "Del"}
        </button>
      </div>
    </div>
  );
};

export default CommentElement;
