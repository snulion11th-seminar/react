import React from "react";
import { useEffect, useState } from "react";
import commentList from "../../data/comment";

const CommentElement = ({
  id,
  post,
  created_at,
  author,
  content,
  deleteComment,
  editComment,
  setEditingCommentId,
  setEditingText,
  editingCommentId,
  editingText,
  handleEditText,
}) => {
  // comment created_at 전처리
  const date = new Date(created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  const handleEditClick = () => {
    setEditingCommentId(id);
    setEditingText(content);
  };

  const handleEditSubmit = () => {
    editComment(id);
  };

  return (
    <div>
      <div className="w-full flex flex-row">
        <div className="w-full flex justify-between gap-1 mb-2">
          <div className="ml-4 w-full">
            {editingCommentId === id ? (
              <>
                <div className="flex flex-row">
                  <input
                    type="text"
                    value={editingText}
                    onChange={handleEditText}
                    className="border-[1px] border-black w-full px-6 py-3 rounded-md text-black bg-transparent placeholder-opacity-50 focus:outline-none focus:ring-[1px] focus:ring-lime-400 focus:border-transparent h-14"
                  />
                  <button
                    className="text-black w-14"
                    onClick={handleEditSubmit}
                  >
                    ✅
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg mr-4">{content}</p>
                <span className="text-base mr-1 text-gray-400">
                  {year}.{month}.{day}
                </span>
              </>
            )}
          </div>
          <div className="w-1/4 flex flex-row-reverse items-center">
            <button className="button" onClick={() => deleteComment(id)}>
              🗑️
            </button>
            {editingCommentId !== id && (
              <button
                className="button selection:mr-3"
                onClick={handleEditClick}
              >
                🖋️
              </button>
            )}
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default CommentElement;
