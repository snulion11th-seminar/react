import { useEffect, useState } from "react";

const CommentElement = (props) => {
  // TODO : props 받기
  const { author } = props;
  const { comment } = props;
  const { deleteComment } = props;
  // TODO : 수정하는 input 내용 관리
  const [IsEditing, setIsEditing] = useState(false);
  const [EditContent, setEditContent] = useState(comment.content);
  const EditChange = (e) => {
    console.log(e.target);
    const { value } = e.target;
    setEditContent(value);
  };

  // comment created_at 전처리
  const [date, setdate] = useState(new Date(comment.created_at));
  const [year, setyear] = useState(date.getFullYear());
  const [month, setmonth] = useState(date.getMonth() + 1);
  const [day, setday] = useState(date.getDate());

  useEffect(() => {
    setyear(date.getFullYear());
    setmonth(
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    );
    setday(date.getDate() < 10 ? `0${date.getDate()}` : date.getDate());
  }, [date]);

  const DateChange = (e) => {
    console.log(e.target);
    setIsEditing(!IsEditing);
    const today = new Date();
    setdate(today);
  };

  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-full flex flex-row justify-between ">
        <div>
          {comment.author.username == localStorage.getItem("username") &&
          IsEditing ? (
            <input
              type="text"
              onChange={EditChange}
              value={EditContent}
              className="input"
            />
          ) : (
            <p>{EditContent}</p>
          )}

          <span className="text-base mr-1 text-gray-300">
            {year}.{month}.{day}
          </span>
        </div>
        <div className="w-1/4 flex flex-row-reverse gap-1 mb-2 items-center">
          {!IsEditing && (
            <button
              id={comment.id}
              className="text-gray-300"
              onClick={deleteComment}
            >
              Del
            </button>
          )}
          {IsEditing ? (
            <button className="text-gray-300" onClick={DateChange}>
              Done
            </button>
          ) : (
            <button
              className="text-gray-300"
              onClick={() => {
                if (localStorage.getItem("username") == comment.author.username)
                  setIsEditing(!IsEditing);
              }}
            >
              Edit
            </button>
          )}
          <div>
            <p className="text-gray-300">{comment.author.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentElement;
