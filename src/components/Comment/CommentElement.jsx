import { useState } from "react";
import { useEffect } from "react";
const CommentElement = ({ id, setId, commentId, setFormData, comments, index }) => {
  // const date = new Date(
  //   comments.filter((t) => t.id === commentId)[0].created_at
  // );
  // const year = date.getFullYear();
  // let month = date.getMonth() + 1;
  // month = month < 10 ? `0${month}` : month;
  // let day = date.getDate();
  // day = day < 10 ? `0${day}` : day;
  //console.log(commentId);
  const [date, setDate] = useState(new Date(
    comments.filter((t) => t.id === commentId)[0].created_at
  ));
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState((date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1);
  const [day, setDay] = useState((date.getDate()) < 10 ? `0${date.getDate()}` : date.getDate());
  const [isEdit, setIsEdit] = useState(false);
  const [inputValue, setInputValue] = useState(
    comments.filter((t) => t.id === commentId)[0].content
  );
  const [comment, setComment] = useState(
    comments.filter((t) => t.id === commentId)[0]
  );
  const [created_at, setCreated_at] = useState(new Date());

  
  const editComment = (commentId) => {
    setIsEdit(!isEdit);
    setId(id-1);

    const newComments = [...comments];
    console.log(newComments);
    console.log(index);
    newComments.splice(index, 1, comment);
    console.log(newComments);
    setFormData(newComments);

  };

  const deleteComment = (commentId) => {
    const newComments = comments.filter((t) => t.id !== commentId);
    setId(id-1);
    //console.log(newComments);
    setFormData(newComments);
  };
  const handleChange = (e) => {
    //console.log(commentId);
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    setDate(created_at);
    setYear(created_at.getFullYear());
    setMonth((created_at.getMonth() + 1) < 10 ? `0${created_at.getMonth() + 1}` : created_at.getMonth() + 1);
    setDay((created_at.getDate()) < 10 ? `0${created_at.getDate()}` : created_at.getDate());
  };

  useEffect(() => {
    setComment({
      ...comment,
      content: inputValue,
      created_at: created_at,
    });
  }, [inputValue]);

  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-full">
        {isEdit ? (
          <div className="flex justify-between">
            <input
              className="input"
              onChange={handleChange}
              value={inputValue}
            />
            <button onClick={() => editComment(comment.id)}>Done</button>
          </div>
        ) : (
          <div className="flex justify-between">
            <p>{comments.filter((t) => t.id === commentId)[0].content}</p>
            <div className="flex gap-2">
              <button onClick={() => editComment(comment.id)}> Edit </button>
              <button onClick={() => deleteComment(commentId)}> Del </button>
            </div>
          </div>
        )}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>

        <div className="w-1/4 flex flex-row-reverse items-center"></div>
      </div>
    </div>
  );
};

export default CommentElement;
