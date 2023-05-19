import { useState } from "react";

const CommentElement = (props) => {
  // TODO : props 받기 *
  // TODO : 수정하는 input 내용 관리
  const [isEditing, setIsEditing] = useState(false);
  const { comment, handleCommentDelete } = props;
  const [commentContent, setCommentContent] = useState(comment.content);

  // comment created_at 전처리
  const date = new Date(comment.created_at);
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
            className="input"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
        ) : (
          <p className="text-lg mr-4">{commentContent}</p>
        )}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
      </div>
      <div className="w-1/4 flex flex-row-reverse items-center">
        <button onClick={() => handleCommentDelete(comment.id)}>
          {isEditing ? "" : "Del"}
        </button>
        <button className="mr-3" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Done" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default CommentElement;
