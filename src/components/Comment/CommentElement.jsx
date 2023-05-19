import { useState } from "react";
import comments from "../../data/comments";

const CommentElement = (props) => {
  // TODO : props 받기
  const [comment, setComment] = useState(props.comment);
  const deleteComment = props.deleteComment;

  //   console.log(comment);
  // TODO : 수정하는 input 내용 관리
  const [isEdit, setIsEdit] = useState(false);

  const onCLickEdit = () => {
    setIsEdit(false);
    setComment(comment);
  };

  const onClickDelete = () => {
    deleteComment(comment.id);
  };

  const handleChange = (e) => {
    // console.log(e);
    setComment({ ...comment, content: e.target.value });
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
        {isEdit ? (
          <input
            className="input mr-4"
            value={comment.content}
            onChange={handleChange}
          />
        ) : (
          <p className="text-lg mr-4">{comment.content}</p>
        )}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
      </div>
      {/* 수정, 삭제버튼 */}
      <div className="w-1/4 flex flex-row-reverse items-center">
        {/* delete 버튼은 수정이 아닐때만 보이게 해줘 */}
        {isEdit ? (
          <button type="button" onClick={onCLickEdit}>
            Done
          </button>
        ) : (
          <>
            <button type="button" onClick={onClickDelete}>
              Del
            </button>
            <button
              type="button"
              className="mr-3"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentElement;
