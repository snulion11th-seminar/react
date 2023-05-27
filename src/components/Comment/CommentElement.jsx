import { useEffect, useState } from "react";
import { getUser, updateComment } from "../../apis/api";
import { getCookie } from "../../utils/cookie";

const CommentElement = ({ comment, deleteComment }) => {
  // TODO : props 받기
  // const [formData,setFormData] = useState({
  //   content: comment.content,
  //   created_at: comment.created_at
  // });
  const [user, setUser] = useState(null);

  const [content, setContent] = useState(comment.content);
  const [commentTime, setCommentTime] = useState(comment.created_at);
  // TODO : 수정하는 input 내용 관리
  const [editComment, setEditComment] = useState(false);
  const [editedComment, setEditedComment] = useState(false);
  // comment created_at 전처리
  const date = new Date(commentTime);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  const handleEditComment = () => {
    updateComment(comment.id, { content: content });
    setEditComment(false);
  };

  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        const user = await getUser();
        setUser(user);
      };
      getUserAPI();
    }
  }, []);

  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-3/4">
        {editComment ? (
          <input
            className="input"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setCommentTime(new Date());
              setEditedComment(true);
            }}
          />
        ) : (
          <p className="text-lg">{comment.content}</p>
        )}
        {editedComment ? (
          <p className="text-gray-500 text-sm">
            <i>Edited</i>
          </p>
        ) : null}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
      </div>
      {user?.id === comment.author.id ? (
        <div className=" flex flex-row justify-between items-center">
          {editComment ? (
            <>
              <button onClick={handleEditComment}> Done </button>
              <button
                className="mr-3"
                onClick={() => {
                  setEditComment(false);
                  setContent(comment.content);
                }}
              >
                Back
              </button>{" "}
            </>
          ) : (
            <div className="flex gap-3">
              <button onClick={() => setEditComment(true)}>Edit</button>
              <button onClick={() => deleteComment(comment)}>Del</button>
            </div>
          )}
        </div>
      ) : (
        <span className="text-gray-400 text-sm">{comment.author.username}</span>
      )}
    </div>
  );
};

export default CommentElement;
