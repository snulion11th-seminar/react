import { useState } from "react";
import comments from "../../data/comments";
import CommentElement from "./CommentElement";

const Comment = () => {
  // TODO 1: comments 불러와서 저장해야겟즤

  // TODO 2: comment추가하는 input 관리해줘야겟지

  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘

  // TODO 4: commet Delete 하는 함수 만들어죠
  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      // commentElement // <CommentElement /> 가 comment마다 반복시켜야즤
      <form>// TODO 2-3 : comment 추가하는 comment form 만들어주기</form>
    </div>
  );
};

export default Comment;
