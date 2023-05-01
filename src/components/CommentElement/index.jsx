import { useState } from "react";

const CommentElement = ({ comment }) => {
  const [content, setContent] = useState(comment.content);
  const [isEdit, setIsEdit] = useState(false);

  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  return (
    <div className="w-11/12 flex justify-between gap-1">
      {
        isEdit ? (
          <input className="input mr-4 " value={content} onChange={(e) => setContent(e.target.value)} />
        ) : (
          <p className="text-lg mr-4">{content}</p>
        )
      }
      <div className="gap-y-1">
        <span>
          {year}.{month}.{day}
        </span>
        <button className="small-button" onClick={() => setIsEdit(!isEdit)}>{isEdit ? "수정완료":"수정"}</button>
      </div>
    </div>
  );
}

export default CommentElement;