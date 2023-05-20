import { useEffect, useState } from "react";
import comments from "../../data/comments";
import CommentElement from "./CommentElement";
import { CommentForm } from "../Form";

export const Comment = (postId) => {
	// TODO 1: 가짜 comments 불러와서 관리해야겟즤
	const [commentList, setCommentList] = useState();
	const [commentIdCounter, setCommentIdCounter] = useState(0);
	useEffect(() => {
		const filteredComment=comments.filter((c)=>{return c.post===postId;})
		setCommentList(filteredComment);
	},[]);
	// TODO 2: comment추가하는 input 관리해줘야겟지
	const [commentInput, setCommentInput] = useState("");
	const [formData, setFormData] = useState({
    id: 0,
    content: "",
    created_at: "",
    post: 0,
    author: {
			id: 0,
			username: ""
		}});
	
	// TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘
	const handleCommentSubmit = () => {
		//comment Input을 가지고 comment를 추가
		const newCommentData = {
			...formData,
			id : commentIdCounter,
			content: commentInput,
			created_at: new Date(),
			post: postId,
			author: {
				id: 2,
				username: "베이비"
			}
		};
		setCommentIdCounter(commentIdCounter+1);
		setCommentList([...commentList, newCommentData]);
	}

	//comment editing
	const handleCommentEdit = (commentId, contentEdited) => {
		//commentId를 가지고 comment를 찾아서 content를 수정
		const newCommentList = commentList.map((comment) => {
			if(comment.id === commentId) {
				comment.content = contentEdited;
				comment.created_at = new Date();
			}
			return comment;
		});
		setCommentList(newCommentList);
	}

	// TODO 4: commet Delete 하는 함수 만들어죠\
	const handleCommentDelete = (commentId) => {
		//commentId를 가지고 comment를 찾아서 삭제
		const newCommentList = commentList.filter((comment) => comment.id !== commentId);
		setCommentList(newCommentList);
	}

	return (
		<div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
			{commentList && commentList.map((comment) => (
				<CommentElement 
					comment={comment} 
					handleCommentEdit={handleCommentEdit} 
					handleCommentDelete={handleCommentDelete}
				/>
			))}
			{/* // <CommentElement/> 가 comment마다 반복시켜야즤 */}

			<CommentForm 
				onSubmit={handleCommentSubmit}
				commentInput={commentInput}
				setCommentInput={setCommentInput}
			/>
		</div>
	);
};

export default Comment;