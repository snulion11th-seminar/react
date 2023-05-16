import { useEffect, useState } from "react";

const CommentElement = ({
  comment,
  commentList,
  setCommentList,
  commentData,
  setCommentData,
  id,
  content,
  onEdit
  //   onClickDelete,
}) => {
  // TODO : props 받기
  // TODO : 수정하는 input 내용 관리

  // comment created_at 전처리
  console.log("왔다");

  console.log(comment);
  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;
  const [isOnClickEdit, setIsOnClickEdit] = useState(false);
  const [editedComment, setEditedComment] = useState(content);

  const onClickEdit = () => {
    setIsOnClickEdit(true);
    
  };

  const clickEdit = (e) => {
    const editCL = e.target.value;
    setEditedComment(editCL);
  };

  const onDoneClick = () => {
    onEdit(id, editedComment)
    setIsOnClickEdit(false);
  };

  const onClickDelete = (id) => {
    console.log(commentList);
    console.log(id);
    const newCL = commentList.filter((c) => c.id !== id);
    console.log(newCL);
    setCommentList(newCL);
  };

  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-3/4" >
        {isOnClickEdit ? (
          <input type="text" className = "input" value={editedComment} onChange={clickEdit}/>
        )
        : (
          <p>{comment.content}</p>
        )}
        {/* // 날짜 */}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
      </div>
      {/* // 수정, 삭제버튼 */}
      <div className="w-1/4 flex flex-row-reverse items-center">
          {/* // delete 버튼은 수정이 아닐때만 보이게 해줘 */}
          {isOnClickEdit ? "":
          <button onClick={() => onClickDelete(comment.id)}>Del</button>}
          
          {isOnClickEdit ? <button type="submit" onClick={() => onDoneClick(comment.id)} class="p-8">Done</button>:<button class="mr-3" onClick={onClickEdit}>Edit</button>}

      </div>
    </div>
  );
};

export default CommentElement;
