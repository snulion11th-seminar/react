import { useState } from "react";

const CommentElement = ({ comment, commentList, setCommentList }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);

  //edit버튼 누를때 isEdit의 state가 t,f로 바뀜
  const handleEdit = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
  };

  // TODO 4: comment Delete 하는 함수 만들어죠..이걸여기서
  const deleteComment = () => {
    setCommentList(commentList.filter((e) => e.id !== comment.id));
  };

//done 눌렀을떄 일어나는일
  const saveEditedComment = (e) => {
    e.preventDefault();
    const updatedCommentList = commentList.map((c) =>
      c.id === editedComment.id ? editedComment : c
    );
    setCommentList(updatedCommentList);
    setIsEdit(false);
  };

  // comment created_at 전처리
  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  return (
    <div className="w-full flex flex-row">
      {isEdit ? ( //edit이 눌렸을때
        <div className="w-full flex justify-between gap-1 mb-2">
          <div className="w-3/4">
            <input
              className="input"
              value={editedComment.content}
              onChange= {(e) => {
                setEditedComment({
                  ...editedComment,
                  content: e.target.value,
                })}
              }/>

            <span className="text-base mr-1 text-gray-300">
              {year}.{month}.{day}
            </span>
          </div>

          <div className="w-1/4 flex flex-row-reverse items-center">
            <button className="commentbutton" onClick={saveEditedComment}>
              Done
            </button>
          </div>
        </div>
      ) : (  // edit이 안눌렸을때
        <div className="w-full flex justify-between gap-1 mb-2">
          <div className="w-3/4">
            <p>{comment.content}</p>
            <span className="text-base mr-1 text-gray-300">
              {year}.{month}.{day}
            </span>
          </div>

          <div className="flex flex-row-reverse w-1/4 items-center">
            <button className="commentbutton" onClick={deleteComment}>
              Del
            </button>
            <button className="commentbutton mr-5" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentElement;
