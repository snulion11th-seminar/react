import { useState } from "react";

const CommentElement = ({ comment, commentList, setCommentList }) => {
  // TODO : props 받기
  // TODO : 수정하는 input 내용 관리
  const [isEditting, setIsEditting] = useState(false);
  const [commentData, setCommentData] = useState(comment.content);
  // comment created_at 전처리
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;
  const handleEditComment = (e) => {
    setCommentData(e.target.value);
  };
  const deleteComment = (id) => {
    console.log(id);
    setCommentList(commentList.filter((comment) => comment.id !== id));
  };

  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-3/4">
        {/* 수정중일때와 아닐때를 다르게 보여줘야겠지 */}
        {isEditting ? (
          <input
            className="input"
            value={commentData}
            onChange={handleEditComment}
          />
        ) : (
          <p>{commentData}</p>
        )}
        {/* 날짜 */}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
      </div>
      {/* 수정, 삭제버튼 */}
      <div className="w-1/4 flex flex-row-reverse items-center">
        {/* delete 버튼은 수정이 아닐때만 보이게 해줘 */}
        {isEditting ? (
          <button onClick={() => setIsEditting(false)}>Done</button>
        ) : (
          <div>
            <button className="mr-3" onClick={() => setIsEditting(true)}>
              Edit
            </button>
            <button onClick={() => deleteComment(comment.id)}>Del</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentElement;
