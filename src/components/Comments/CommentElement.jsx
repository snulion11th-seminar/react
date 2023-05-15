import { useEffect, useState } from "react";

const CommentElement = ({ comment, deleteComment, editComment}) => {
  // TODO : props 받기
  // TODO : 수정하는 input 내용 관리`

  // comment created_at 전처리
  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  const [isClickEdit, setIsClickEdit] = useState(false);

  const onClickDelete = () => {
    console.log("delete");
    deleteComment(comment);
  };

  const onClickEdit = () => {
    setIsClickEdit(true);
  };

	const doneClickEdit = () => {
		// setFormData((nowFormData) => ({
		// 	...nowFormData,
		// 	content: input.value
		// }))
		editComment(comment);
    setIsClickEdit(false);
  };

  // useEffect(()=>{
  // 	if(handleCommentDelete){

  // 	}
  // })

  return (
    <div>
      <div className="w-full flex justify-between gap-1 mb-2">
        {isClickEdit ? (
          <div className="w-full flex flex-row">
            <div className="w-3/4">
              <input className="input mr-4" defaultValue= {comment.content} />
              <span className="text-base mr-1 text-gray-300">
                {year}.{month}.{day}
              </span>
            </div>
            <div className="w-1/4 flex flex-row-reverse items-center">
              <button className="mr-3 mb-6" onClick={doneClickEdit}>Done</button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-row">
            <div className="w-3/4">
              <div>{comment.content}</div>
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
    </div> // 1
    // 			<div>
    // 		<div className="w-3/4">
    // 			<div>{comment.content}</div>
    // 			<span className="text-base mr-1 text-gray-300">
    // 					{year}.{month}.{day}
    // 			</span>
    // 		</div>
    // 		<div className="w-1/4 flex flex-row-reverse items-center">
    // 			<button onClick={onClickDelete}>Del</button>
    // 			<button className="mr-3" onClick={onClickEdit}>Edit</button>
    // 		</div>
    // 		)};
  );
};

export default CommentElement;
