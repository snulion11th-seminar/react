import { useState } from "react";

const CommentElement = ({commentData,setCommentData,commentId}) => {
	// TODO : props 받기
	// TODO : 수정하는 input 내용 관리

	// comment created_at 전처리
  const [isadjusted,setIsadjusted] = useState(false);
  const [commentInput,setcommentInput] = useState("");

  // let commentId;
  console.log("CommentElement 시작 확인");
  console.log(commentData);
  // let targetComment;
  // const findTargetComment = () =>{
  //   targetComment = commentData && commentData.find((comment) => 
  //   comment.id == commentId );
  //   console.log("Target updated");
  // }
  const targetComment = commentData && commentData.find((comment) => 
    comment.id == commentId );


  const inputSave = (e) =>{
    setcommentInput(e.target.value);
    console.log(commentInput);
  }

  // 결과는 되는데 수정이 필요
  const handleDoneButton = ()=>{
    const newcomment = commentInput;
    const tempComment = new Array(...commentData);
    tempComment.map((Tcomment) => {
      if(Tcomment.id === commentId){
        Tcomment.content = newcomment;
      }
    })
    setCommentData(tempComment);
    setIsadjusted(false);
  }

  const editButton = (e) =>{
    console.log(e.target);
    setIsadjusted(true);
  }

  const deleteComment = () => {
    const tempComments = commentData.filter((comment) => comment.id !== commentId);
    setCommentData(tempComments);
    // setCommentData({
    //   ...commentData,
    //   comments: commentData.id.filter((t) => t !== comment),
    // });
  };

  console.log(targetComment && targetComment.created_at);
	const date = new Date(targetComment && targetComment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;
  return(
  targetComment &&
	<div className="w-full flex justify-between gap-1 mb-2">
    <div className="w-3/4">
			{/* // 수정중일때와 아닐때를 다르게 보여줘야겠지 */}
			{isadjusted?
				<input className="input h-14" onChange = {inputSave}/>:<p className="text-lg mr-4">{targetComment.content}</p>
			}

			{/* // 날짜 */}
			<span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
      </span>

			{/* // 수정, 삭제버튼 */}

		</div>
    {isadjusted?<>
      <div className= "w-1/4 flex flex-row-reverse items-center"><button onClick={handleDoneButton} classNmae="button mt-7" >Done</button></div></>:
        <><div ><button onClick={editButton} className="mr-3" >Edit</button>
			
      <button onClick={deleteComment}> Delete </button>
			</div></>}
	</div>);

};

export default CommentElement;
