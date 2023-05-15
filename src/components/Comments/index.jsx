import { createElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import comment from "../../data/comment";
import CommentElement from "./CommentElement";

const Comment = ({ commentt }) => {
	// TODO 1: 가짜 comments 불러와서 관리해야겟즤
	const { postId } = useParams();

	const [comments, setComments] = useState();

	useEffect(() => {
		const comments = comment.filter((comment)=> comment.post == postId);
		setComments(comments);
	}, [postId]);

	// TODO 2: comment추가하는 input 관리해줘야겟지
	const [isSubmitted, setIsSubmitted] = useState(false);	
	const [commentInputValue, setCommentInputValue] = useState("");
	
	useEffect(() =>{
		const commentInputValue = formData.content;
		setCommentInputValue(commentInputValue);
		// commentelement로 만들어줘야겠지? -> 이게 아닌가벼?
		// 그럼 이걸 그냥 밑에 올리는. 그런... 
	},[commentInputValue]);

	// TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘

	const time = new Date();
	const [created_at, setCreated_at] = useState(time.toJSON());
	// ✅ submit 될 때의 시간을 넣고 싶은데 어떻게 하지??!?

	const [formData, setFormData] = useState({
		id: comment.length + 1, // 이건 data/comment에 접근을 못해서 제대로 된 index가 나올 수 없을 듯...
		content: "",
		created_at: created_at,
		post: postId, // 사실 여기에는 postId가 들어가는 명세로 되어있어요
		author: {id: 2, username: "user2"}
	});

	const handleFormData = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
		console.log(formData);
  };

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		comments.push(formData);
		console.log(formData.content);
		setFormData((nowFormData) => ({
			...nowFormData,
			content: ""
		}))
		// console.log("input", commentInputValue);
		console.log(comments);
    // alert(`"${formData.content}" 댓글이 작성 완료되었습니다잉`);
		// comments.push(formData);
  };

// TODO 4: commet Delete 하는 함수 만들어죠
	const deleteComment = (comment) => {
		console.log(comment.content);
		const deletedComments = comments.filter((c) => c.content !== comment.content)
		setComments(deletedComments);
		console.log(deletedComments);
	};

	const editComment = (comment) => {
		// console.log("comment:", comment);
		// console.log("comment.id:", comment.id);
		// console.log("감히 제가.. comments에 접근해봅니다", comments[comment.id-1]);
		console.log(comment.value);
		const editedComment = comments[comment.id-1].content = comment.value;
		// console.log(editedComment);
	};

	return (
		<div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
			{/* // commentElement */}
			{/* // <CommentElement/> 가 comment마다 반복시켜야즤 */}
			
			{comments && comments.map((comment)=> (
				<CommentElement comment={comment} deleteComment={deleteComment} editComment={editComment}/>
			))}

			<form className="flex items-center justify-center mt-10 gap-2" onSubmit={handleCommentSubmit}>
				{/* // TODO 2-3 : comment 추가하는 comment form 만들어주기 */}
				<input 
					required
					type="text" 
					id="content"
					className="input h-14"
					onChange={handleFormData}
	        value={formData.content}
					placeholder="댓글을 입력해주세용"
				/>

				<button type="submit" className="button">
          comment
        </button>
			</form>
		</div>
	);
};

export default Comment;