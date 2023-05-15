import React, { useState } from "react";

const CommentElement = (props) => {
  // TODO : props 받기
  // TODO : 수정하는 input 내용 관리
  const { id, content, created_at, post, author, commentDelete } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  // comment created_at 전처리
  const date = new Date(created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-3/4">
        {isEditing ? (
          <input
            className="w-full border-2 border-gray-300 rounded-2xl px-5 py-3 mt-2 mb-2 text-white bg-transparent"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p className="text-lg">{editedContent}</p>
        )}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
      </div>
      <div className="w-1/4 flex flex-row-reverse items-center">
        {!isEditing && (
          <button
            className="text-gray-300 mr-3"
            onClick={() => commentDelete(id)}
          >
            Del
          </button>
        )}
        {isEditing ? (
          <button
            className="text-gray-300 mr-3"
            onClick={() => setIsEditing(false)}
          >
            Done
          </button>
        ) : (
          <button
            className="text-gray-300 mr-3"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentElement;
