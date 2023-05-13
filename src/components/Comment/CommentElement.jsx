import { useState } from "react";

const CommentElement = (props) => {
  const { comment, handleCommentDelete } = props;
  const [content, setContent] = useState(comment.content);
  const [isEdit, setIsEdit] = useState(false);

  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-3/4">
        {isEdit ? (
          <input
            className="input mr-4"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p className="text-lg mr-4">{content}</p>
        )}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
      </div>
      <div className="w-1/4 flex flex-row-reverse items-center">
        {!isEdit && (
          <button onClick={() => handleCommentDelete(comment.id)}>Del</button>
        )}
        <button className="mr-3" onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? "Done" : "Edit"}
        </button>
      </div>
    </div>
  );
};
export default CommentElement;
