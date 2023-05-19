import { useState } from "react";
import comments from "../../data/comments";
import CommentElement from "./CommentElement";

const Comment = (props) => {
  // TODO 1: comments 불러와서 저장해야겟즤
  const { post } = props;
  console.log(post);
  const [commentList, setCommentList] = useState(
    comments.filter((c) => c.post === post.id)
  );

  // TODO 2: comment추가하는 input 관리해줘야겟지
  const [newComment, setnewComment] = useState("");
  const handlenewComment = (e) => {
    const { value } = e.target;
    setnewComment(value);
    console.log(value);
  };
  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘

  const [numComment, setnumComment] = useState(comments.length);

  const ChangeComment = (e) => {
    e.preventDefault();
    setnumComment(numComment + 1);
    const today = new Date();
    const newCommentObject = {
      id: numComment + 1,
      content: newComment,
      created_at: today,
      post: post.id,
      author: { id: 10, username: localStorage.getItem("username") },
    };
    setnewComment("");
    setCommentList([...commentList, newCommentObject]);
  };

  console.log(commentList);

  // TODO 4: commet Delete 하는 함수 만들어죠
  const deleteComment = (e) => {
    console.log(e.target.id);
    console.log(commentList);
    const selected_comment = commentList.find((c) => c.id == e.target.id);
    console.log(selected_comment.author.username);
    if (
      selected_comment != null &&
      selected_comment.author.username == localStorage.getItem("username")
    ) {
      console.log("delete 시도");
      const deleted_id = e.target.id;
      setCommentList(commentList.filter((c) => c.id != deleted_id));
      console.log(commentList);
    }
  };
  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      <div className="w-full justify-center">
        {commentList.map((comment) => (
          <CommentElement comment={comment} deleteComment={deleteComment} />
        ))}
      </div>
      <form
        onSubmit={ChangeComment}
        className="flex flex-row justify-between gap-2"
      >
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          value={newComment}
          className="input"
          onChange={handlenewComment}
        />
        <button type="submit" className="rounded-full border-white">
          Comment
        </button>
      </form>
    </div>
  );
};

export default Comment;
