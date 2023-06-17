import { useEffect, useState } from "react";
import CommentElement from "./CommentElement";
import { CommentForm } from "../Form";
import { deleteComment, getComments } from "../../apis/api";

export const Comment = ({postId}) => {
	// TODO 1: 가짜 comments 불러와서 관리해야겟즤
	const [commentList, setCommentList] = useState([]);

	//get comments
	useEffect(() => {
		const getCommentAPI=async ()=>{
			const comments=await getComments(postId);
			setCommentList(comments);
		};
		getCommentAPI();
	},[postId]);

	
	
	// TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘


	// //comment editing
	// const handleCommentEdit = (commentId, contentEdited) => {
	// 	//commentId를 가지고 comment를 찾아서 content를 수정
	// 	const newCommentList = commentList.map((comment) => {
	// 		if(comment.id === commentId) {
	// 			comment.content = contentEdited;
	// 			comment.created_at = new Date();
	// 		}
	// 		return comment;
	// 	});
	// 	setCommentList(newCommentList);
	// }

	// TODO 4: commet Delete 하는 함수 만들어죠\
	const handleCommentDelete = (commentId) => {
		//commentId를 가지고 comment를 찾아서 삭제
		if(window.confirm("정말 삭제?")){
			deleteComment(commentId);
			
		}
	}

	return (
		<div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
			{commentList && commentList.map((comment) => (
				<CommentElement 
					comment={comment} 
					// handleCommentEdit={handleCommentEdit} 
					handleCommentDelete={handleCommentDelete}
				/>
			))}
			{/* // <CommentElement/> 가 comment마다 반복시켜야즤 */}

			<CommentForm postId={postId}/>
		</div>
	);
};

export default Comment;