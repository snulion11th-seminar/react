import { useState } from "react";

const CommentElement = ({ comment, commentDelete }) => {
  // TODO : props 받기
  // TODO : 수정하는 input 내용 관리
  const [editing, setEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.content);

  const deleteComment = (e) => {
    commentDelete(comment.id);
  };
  
  // comment created_at 전처리
  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  return (
    <div className="flex justify-between gap-1 mb-2">
      <div className="w-full">
        {editing ? (
          <input
            className="w-3/4 input mr-4 text-white"
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          ></input>
        ) : (
          <p>{editedComment}</p>
        )}
        {/* <p className="text-gray-500 text-sm">
          {comment.author.username}
        </p> 새로 쓰는 댓글 작성자 에러(로그인,,)*/}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
        <div className="flex justify-end">
          {!editing && (
            <button className="mr-3" onClick={deleteComment}>
              Del
            </button>
          )}
          {editing ? (
            <button className="flex" onClick={() => setEditing(false)}>
              Done
            </button>
          ) : (
            <button className="mr-3" onClick={() => setEditing(true)}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentElement;
