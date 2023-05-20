import React, { useState } from "react";

const CommentElement = ({comment, handleCommentEdit, handleCommentDelete}) => {
  // TODO : props 받기
  // TODO : 수정하는 input 내용 관리
  // comment created_at 전처리
  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  const [commentInput, setCommentInput] = useState(comment.content);
  const [editing, setEditing] = useState(false);
  const onclickEdit = (e) => {
    e.preventDefault();
    if(editing)
      handleCommentEdit(comment.id, commentInput); //will edit comment
    setEditing(!editing);
  };

  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-3/4">
        {/* {수정중 ? <input /> : <p>{내용}</p>} */}
        {editing?
          <input onChange={(e)=>{setCommentInput(e.target.value)}} value={commentInput} className="input"/> 
          : <p className="text-lg" >{commentInput}</p>
        }
        {editing ? null:
          <span className="text-base mr-1 text-gray-300">
            {year}.{month}.{day}
          </span>
        } 
      </div>
        <div className="w-1/4 flex flex-row-reverse items-center">
          {!editing?<button className="text-gray-300 ml-1 mr-1" onClick={()=>{handleCommentDelete(comment.id)}}>삭제</button>:null}
          <button className="text-gray-300 ml-1 mr-1" onClick={onclickEdit}>
            {editing ? "수정완료" : "수정"}
          </button>

        </div>
    </div>
    );
};

export default CommentElement;
