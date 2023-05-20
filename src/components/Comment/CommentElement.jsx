import { useState } from "react";

const CommentElement = ({
  key,
  comment,
  handleCommentChange,
  handleCommentDelete,
}) => {
  // comment created_at 전처리
  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  // edit 버튼 누른지 여부 확인
  const [isEdited, setIsEdited] = useState(false);
  // edit 인풋창 상태 반영함
  const [editedComment, setEditedComment] = useState(comment);

  // input 값의 value를 editedComment.content에 저장
  const handleInputChange = (e) => {
    const newContent = e.target.value;
    setEditedComment((prevComment) => ({
      ...prevComment,
      content: newContent,
    }));
  };

  const onClickEdit = (e) => {
    if (isEdited === false) {
      setIsEdited(true);
      return;
    }
    handleCommentChange(editedComment.id, editedComment.content);
    setIsEdited(false);
  };

  // props로 내려준 delete함수 실행
  const onClickDel = (e) => {
    handleCommentDelete(comment.id);
  };

  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-full flex flex-row">
        <div className="w-3/4 flex flex-col">
          {/* 수정중일때 다르게 보여줌 */}
          <div className="text-lg mr-4">
            {isEdited ? (
              <form>
                <input
                  className="input"
                  type="text"
                  value={editedComment.content}
                  name="content"
                  onChange={handleInputChange}
                />
              </form>
            ) : (
              <p>{comment.content}</p>
            )}
          </div>

          {/* 날짜 */}
          <span className="text-base mr-1 text-gray-300">
            {year}.{month}.{day}
          </span>
        </div>

        {/* 버튼 */}
        <div className="w-1/4 flex justify-between">
          <div className="flex flex-row items-center">
            {comment.author.username}
          </div>
          <div className="flex flex-row-reverse items-center">
            {isEdited ? (
              <div className="invisible">Del</div>
            ) : (
              <button onClick={onClickDel}>Del</button>
            )}

            <button className="mr-3" onClick={onClickEdit}>
              {isEdited ? "Done" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentElement;
