import commentList from "./index";
import commentData from "./index";
import updateComment from "./index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CommentElement = (props) => {
  // TODO : props 받기
  // TODO : 수정하는 input 내용 관리
  // props로 받은내용으로 채우기
  const { comment, deleteComment, updateComment } = props;

  const [onEdit, setOnEdit] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const editComment = () => {
    setOnEdit(true);
  };

  const saveComment = () => {
    updateComment(comment.id, editContent);
    setOnEdit(false);
  };

  const handleContentChange = (e) => {
    setEditContent(e.target.value);
  };

  const { created_at } = comment;
  // comment created_at 전처리
  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  console.log(comment, comment.id);

  return (
    <div className="w-full flex justify-between flex-col gap-1 mb-2">
      <div className="flex items-center">
        <div className="w-3/4">
          {/* 수정중일때와 아닐때를 다르게 보여줘야겠지!*/}
          {onEdit ? (
            <textarea
              value={editContent}
              onChange={handleContentChange}
              id="content"
              className="input"
              cols="5"
              rows="2"
              required
            ></textarea>
          ) : (
            <p>{comment.content}</p>
          )}
          <span>
            {year}.{month}.{day}
          </span>
        </div>

        {/* 수정, 삭제버튼 */}
        <div className="w-1/4 flex justify-end space-x-2">
          {onEdit ? (
            <button onClick={() => saveComment(comment.id)}>Done</button>
          ) : (
            <button onClick={() => editComment(comment.id)}>Edit</button>
          )}

          {onEdit ? (
            <></>
          ) : (
            <button onClick={() => deleteComment(comment.id)}>Del</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentElement;
