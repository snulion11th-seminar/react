import { useState } from "react";

const CommentElement = ({ comment, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [editedAt, setEditedAt] = useState(comment.created_at);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    comment.content = editedContent;
    setEditedContent("");
    comment.created_at = new Date();
    setEditedAt(comment.created_at);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(comment.id);
  };

  const date = new Date(editedAt);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;
  const hour = date.getHours();
  const minute = date.getMinutes();

  return (
    <div className="w-full flex justify-between gap-1 mb-2 border hover:border-dashed border-white rounded-lg p-4">
      <div className="w-3/4">
        <div className="text-xl font-bold text-orange-500">
          {comment.author.username}
        </div>
        {isEditing ? (
          <input
            className="input"
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p>{comment.content}</p>
        )}

        <div className="flex justify-start gap-3 text-base/3 text-gray-500">
          {year}.{month}.{day} {hour}:{minute}
        </div>
      </div>

      <div className="w-1/4 flex flex-row-reverse items-center">
        {isEditing ? (
          <>
            <button className="btn-primary" onClick={handleSave}>
              Done
            </button>
          </>
        ) : (
          <>
            <button className="btn-danger" onClick={handleDeleteClick}>
              Del
            </button>
            <button className="btn-secondary mr-3" onClick={handleEdit}>
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentElement;
