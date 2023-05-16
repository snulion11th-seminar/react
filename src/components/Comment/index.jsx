import { useState } from "react";
import comments from "../../data/comments";
import CommentElement from "./CommentElement";

const Comment = () => {
  // TODO 1: comments 불러와서 저장해야겟즤
  const [commentList, setCommentList] = useState(comments);
  console.log(commentList);
  // TODO 2: comment추가하는 input 관리해줘야겟지
  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘
  const [commentData, setCommentData] = useState("");

  const editComment = (e) => {
    console.log(e.target.value);
    setCommentData(e.target.value);
	// setCommentData("");
  };

  const onSubmitClick = (e) => {
    e.preventDefault();

    let commentFormat = {
      id: 6,
      content: commentData,
      created_at: "2023-04-18T15:09:43Z",
      post: 1,
      author: {
    	id: 2,
        username: "user2",
      },
    };

    setCommentList([...commentList, commentFormat]);
	setCommentData("");
  };

  const handleEditComment = (id, newContent) => {
	setCommentList(prevCommentList => {
		const updatedList = prevCommentList.map(comment => {
			if(comment.id === id){
				return {...comment, "content": newContent};
			}
			return comment;
	});
	return updatedList;
  });
};

  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      {commentList.map((c) => (
        <CommentElement
          comment={c}
		  id = {c.id}
		  content = {c.content}
		  onEdit = {handleEditComment}
          commentList={commentList}
          setCommentList={setCommentList}
		  commentData={commentData}
		  setCommentData={setCommentData}
        //   onClickDelete={onClickDelete}
        />
      ))}
      {/* <form onSubmit={onSubmitClick} class="flex items-center justify-center mt-10 gap-2"> */}
	  <form class="flex items-center justify-center mt-10 gap-2">
        {/* // TODO 2-3 : comment 추가하는 comment form 만들어주기 */}
        <input
          required
        //   type="comment"
		  type="text"
        //   id="comment"
          className="input"
          onChange={editComment}
          defaultValue=""
          placeholder="댓글을 입력해주세요"
		  value={commentData}

        />
        <button
          type="submit"
		  class= "bg-orange-400 text-white font-medium hover:text-black rounded-xl text-lg p-3.5"
		  onClick = {onSubmitClick}
        >comment</button>
      </form>
    </div>
  );
};

export { Comment };
