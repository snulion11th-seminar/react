import { useEffect, useState } from "react";
import { getUser, updateComment } from "../../apis/api";
import { getCookie } from "../../utils/cookie";

export const CommentElement = (
  props
) => {
  // TODO : props 받기
  const { comment, handleCommentDelete } = props;
  // TODO : 수정하는 input 내용 관리
  const [user, setUser] = useState(null);

  const [commentInput, setCommentInput] = useState(comment.content);

  const [isSubmitted, setIsSubmitted] = useState(false);

  // comment created_at 전처리
  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

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

  // const commentDelete = () => {
  //   const newCommentList = commentList.filter(
  //     (clickedComment) => clickedComment.id !== comment.id
  //   );
  //   setCommentList(newCommentList);
  //   console.log(comment.id);
  // };

  const handleEditComment = () => {
    updateComment(comment.id, { content: commentInput });
  };
  // updateComment 활용

  useEffect(() => {
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
          {user?.id === comment.author ? (
            <div className="w-1/4 flex flex-row-reverse items-center">
              {isSubmitted ? (
                <>
                  <button onClick={handleEditComment}>Done</button>

                  <button
                    className="mr-3"
                    onClick={() => {
                      setIsSubmitted(!isSubmitted);
                      setCommentInput(comment.content);
                    }}
                  >
                    Back
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleCommentDelete(comment.id)}>
                    Del
                  </button>
                  <button
                    className="mr-3"
                    onClick={() => setIsSubmitted(!isSubmitted)}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ) : null}

          {/* comment 데이터를 console에 찍어보면, comment.author에는
					comment를 작성한 유저의 id만 전달. 그러니 comment.author만 적음 */}
        </div>
      </div>
    </div>
  );
};

export default CommentElement;
