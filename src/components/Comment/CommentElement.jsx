import { useEffect, useState } from "react";

export const CommentElement = ({ comment, commentList, setCommentList }) => {
  // TODO : props 받기

  // TODO : 수정하는 input 내용 관리

  const [commentInput, setCommentInput] = useState(comment.content);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const commentStatus = () => {
    if (isSubmitted) {
      return setIsSubmitted(false);
    } else {
      return setIsSubmitted(true);
    }
  };

  // comment created_at 전처리
  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  const commentDelete = () => {
    const newCommentList = commentList.filter(
      (clickedComment) => clickedComment.id !== comment.id
    );
    setCommentList(newCommentList);
    console.log(comment.id);
  };

  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="flex flex-row justify-between w-full ">
        <div className="flex flex-col">
          {/* 수정중일때와 아닐때를 다르게 보여줘야겠지 */}
          {isSubmitted ? (
            <input
              className="input"
              value={commentInput}
              onChange={(e) => {
                setCommentInput(e.target.value);
              }}
            />
          ) : (
            <p className="text-lg ">{commentInput}</p>
          )}
          {/* // 날짜 */}
          <span className="text-base mr-1 text-gray-300">
            {year}.{month}.{day}
          </span>
        </div>
        <div className="flex felx-row justify-between">
          {/* // 수정, 삭제버튼 */}
          <div className="w-1/4 flex flex-row-reverse items-center">
            {isSubmitted ? (
              <button onClick={commentStatus}>Done</button>
            ) : (
              <button onClick={commentStatus}>Edit</button>
            )}
          </div>
          <div className="w-1/4 flex flex-row-reverse items-center">
            {/* // delete 버튼은 수정이 아닐때만 보이게 해줘 */}
            {isSubmitted ? null : <button onClick={commentDelete}>Del</button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentElement;
