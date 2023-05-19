import { useEffect, useState } from "react";

const CommentElement = (props) => {
  // TODO : props 받기
  // TODO : 수정하는 input 내용 관리

  // comment created_at 전처리
  const date = new Date(props.comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  const [edited, setEdited] = useState();
  const [content, setContent] = useState();

  useEffect(() => {
    setContent(props.comment.content);
  }, []);

  const handleChange = (e) => {
    const text = e.target.value;
    setContent(text);
  };

  const deleteComment = (e) => {
    props.deleteComment(props.id);
    console.log(props.id);
  };

  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-3/4">
        {edited ? (
          <input
            className="input mr-4"
            onChange={handleChange}
            value={content}
          />
        ) : (
          <p>{content}</p>
        )}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
      </div>

      {edited ? (
        <div className="w-1/4 flex flex-row-reverse items-center">
          <button
            onClick={() => {
              setEdited(false);
            }}
          >
            Done
          </button>
        </div>
      ) : (
        <div className="w-1/4 flex flex-row-reverse items-center">
          <button onClick={deleteComment}>Del</button>
          <button
            onClick={() => {
              setEdited(true);
            }}
            className="mr-3"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentElement;
