import { useState } from "react";

export const CommentElement = ({ comment, deleteComment }) => {
  // TODO : props 받기
  // TODO : 수정하는 input 내용 관리
  const [content, setContent] = useState(comment.content);
  const [editInput, setEditInput] = useState(content);
  const [isEdit, setIsEdit] = useState(false);
  
  const handleEdit = (e) => {
    setEditInput(e.target.value);
  };

  const onClickEdit = () => {
    setIsEdit(true);
  };

  const onClickDone = () => {
    setIsEdit(false);
    setContent(editInput);
  };

  const onClickDel = () => {
    console.log(comment.id)
    deleteComment(comment.id)
  };

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
        {/* // 수정중일때와 아닐때를 다르게 보여줘야겠지 */}
        {isEdit ? (
          <input
            type="text"
            placeholder={content}
            id="comment"
            value={editInput}
            className="input"
            onChange={handleEdit}
          />
        ) : (
          <p>{content}</p>
        )}
        {/* // 날짜 */}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
      </div>
      {/* // 수정, 삭제버튼 */}
      <div className="w-1/4 flex flex-row-reverse items-center">
        {/* // delete 버튼은 수정이 아닐때만 보이게 해줘 */}
        {isEdit ? (
          null
        ) : (
          <button className="mr-3" onClick={onClickDel}>
            Del
          </button>
        )}
        {isEdit ? <button
            className="mr-3" onClick={onClickDone}
          >
            Done
          </button> : 
          <button
          className="mr-3" onClick={onClickEdit}
        >
          Edit
        </button>
          }
      </div>
    </div>
  );
};

