import { useEffect, useState } from "react";
import { getUser, updateComment, deleteComment } from "../../apis/api";
import { getCookie } from "../../utils/cookie";

const CommentElement = ({
  // comment,
  // commentList,
  setCommentList,
  // commentData,
  // setCommentData,
  // id,
  // // content,
  onEdit,
  // postId
  comment
  // handleCommentDelete

  
}) => {
  console.log(comment);
  // const { comment, handleCommentDelete } = props;
  // TODO : props 받기
  // TODO : 수정하는 input 내용 관리
  const [content, setContent] = useState(comment.content);
  const [isEdit, setIsEdit] = useState(false);
  const [user, setUser] = useState(null);

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

  const handleEditComment = () => {
    updateComment(comment.id, { content: content });

  };

  useEffect(() => {
    if (getCookie("access_token")) {
      const getUserAPI = async () => {
        const user = await getUser();
        setUser(user);
      };
      getUserAPI();
    }
  }, []);

  const handleCommentDelete = async () => {
    // console.log(commentList);
    // console.log(id);
    // const newCL = commentList.filter((c) => c.id !== id);
    // console.log(newCL);
    // setCommentList(newCL);
    // console.log(comment.id);
    // deleteComment(comment.id);
    
    deleteComment(comment.id);
    
  };

  // const onClickEdit = () => {
  //   setIsOnClickEdit(true);
  // };

  // const clickEdit = (e) => {
  //   const editCL = e.target.value;
  //   setEditedComment(editCL);
  // };

  // const onDoneClick = () => {
  //   onEdit(id, editedComment);
  //   setIsOnClickEdit(false);
  // };

  // const handleCommentDelete = async () => {
  //   // console.log(commentList);
  //   // console.log(id);
  //   // const newCL = commentList.filter((c) => c.id !== id);
  //   // console.log(newCL);
  //   // setCommentList(newCL);
  //   // console.log(comment.id);
  //   // deleteComment(comment.id);
  //   deleteComment(comment.id);
    
  // };
  // console.log(comment.id);

  // useEffect(() => {
  //   const deleteCommentAPI = async () => {
  //     const deletecomment = await deleteComment(pos);

  //   }
  //   deleteCommentAPI();

  // },[onClickDelete]);

  // console.log(postId);

  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-3/4">
        {isEdit ? (
          <input
          className="input mr-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p className="text-lg mr-4">{comment.content}</p>
        )}
        {/* // 날짜 */}
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
      </div>
      {/* // 수정, 삭제버튼 */}
      {user?.id === comment.author.id ? (
        <div className="w-1/4 flex flex-row-reverse items-center">
          {isEdit ? (
            <>
              <button onClick={handleEditComment}>Done</button>

              <button
                className="mr-3"
                onClick={() => {
                  setIsEdit(!isEdit);
                  setContent(comment.content);
                }}
              >
                Back
              </button>
            </>
          ) : (
            <>
              <button onClick={handleCommentDelete}>
                Del
              </button>
              <button className="mr-3" onClick={() => setIsEdit(!isEdit)}>
                Edit
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default CommentElement;
