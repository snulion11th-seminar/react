import { useState } from "react";
import CommentElement from "./CommentElement";
import comments from "../../data/comment";

const Comment = () => {

  const [commentData, setCommentData] = useState(comments);
  const [newCommentData, setnewCommentData] = useState({
    id : 0,
    content : "",
    created_at : "",
    post : "",
    author : {
      id : 0,
      username : "",
    },
  }
  );

	// TODO 1: 가짜 comments 불러와서 관리해야겟즤 끝

	// TODO 2: comment 추가하는 input 관리해줘야겟지

  const handleFormData = (e) => {
    setnewCommentData((prevState) =>({
      ...prevState,
      id : commentData.length + 1,
      content : e.target.value,
      created_at : "2023-04-18T15:09:43Z",
      post : "1",
      author : {
        ...prevState.author,
        id : 2,
        username : "user2",
      }
    }));
    console.log("아래가 추가할 데이터");
    console.log(newCommentData);
    
  }

  const addNewcomment = (e) =>{
    e.preventDefault();
    const newcomment = document.getElementById('Newcomment');
    console.log(newcomment);
    console.log(newCommentData);
   {newcomment.value.length > 0 && setCommentData([...commentData, newCommentData]);
   }
   console.log("아래가 현재 데이터");
   console.log(commentData);
   newcomment.value = null;
   
  }

	// TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘

	// TODO 4: comment Delete 하는 함수 만들어죠
	return (
		<div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      <div className="w-full flex flex-col">
			{commentData.map((comment)=>(
        <CommentElement 
          commentData={commentData}
          setCommentData={setCommentData}
          commentId = {comment.id}/>
      ))}
      </div>
      <form className="flex itmes-center justify-center mt-10 gap-2">
				 {/* TODO 2-3 : comment 추가하는 comment form 만들어주기 */}
         <input id="Newcomment" type="text" className="input h-14" onChange={handleFormData}/>
         <button onClick={addNewcomment} className="button">Comment</button>
			</form>
		</div>
	);
};

export default Comment;