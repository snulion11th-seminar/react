import { useEffect, useState } from "react";

const CommentElement = ({
  comment,
  comments,
  deleteComment,
  setComments
}) => {
  // TODO : props 받기
  // TODO : 수정하는 input 내용 관리`

  // comment created_at 전처리
  console.log(comments);
  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  const [isClickEdit, setIsClickEdit] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);

  const onClickDelete = () => {
    console.log("delete");
    deleteComment(comment);
  };

  const onClickEdit = () => {
    console.log("edit");
    setIsClickEdit(true);
  }

  const editingContent = (e) => {
    // console.log(e.target.value);
    setCommentContent(e.target.value);
  }

  const updateComment = (e) => {
    e.preventDefault();
    const updatingComments = comments.map((c) => (
      // c.id == comment.id ? ([...comments, c.content= commentContent]) : ([...comments])
      c.id == comment.id ? (c.content= commentContent) : ([...comments])
    ));
    // console.log("comments!", comments);
    setComments(comments);
    // console.log(comments);
    setIsClickEdit(false);
  }

  return (
    <div>
      <div className="w-full flex justify-between gap-1 mb-2">
        {isClickEdit ? (
          <form className = "form" onSubmit={updateComment}>
            <div className="w-full flex flex-row">
              <div className="w-3/4">
                <input
                  id = "edited_content"
                  className="input mr-4"
                  defaultValue={comment.content}
                  onChange={editingContent}
                />
                <span className="text-base mr-1 text-gray-300">
                  {year}.{month}.{day}
                </span>
              </div>
              <div className="w-1/4 flex flex-row-reverse items-center">
                <button className="mr-3 mb-6" type="submit">
                  Done
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="w-full flex flex-row">
            <div className="w-3/4">
              <div>{commentContent}</div>
              <span className="text-base mr-1 text-gray-300">
                {year}.{month}.{day}
              </span>
            </div>
            <div className="w-1/4 flex flex-row-reverse items-center">
              <button onClick={onClickDelete}>Del</button>
              <button className="mr-3" onClick={onClickEdit}>
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div> 
  );
};

export default CommentElement;
