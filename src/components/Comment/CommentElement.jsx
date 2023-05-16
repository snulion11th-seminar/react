import { useState } from "react";

const CommentElement = ({ comment, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    comment.content = editedContent;
    setIsEditing(false);
    setEditedContent("");
  };

  const handleDeleteClick = () => {
    onDelete(comment.id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;

    return `${year}.${month}.${day}`;
  };

  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-3/4">
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

        <span className="text-base mr-1 text-gray-300">
          {formatDate(comment.created_at)}
        </span>
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
