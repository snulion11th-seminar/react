import { useEffect, useState } from "react";
import comments from "../../data/comment";
import CommentElement from "./CommentElement";
import { useParams } from "react-router-dom";

const Comment = () => {
  // TODO 1: 가짜 comments 불러와서 관리해야겟즤
  const [formData, setFormData] = useState(comments);
  const param = useParams();
  const [comment, setComment] = useState({
    id: formData.length + 1,
    content: "",
    post: param,
    created_at: new Date().toISOString(),
    author: {
      id: 1,
      username: "user1",
    },
  });
  // TODO 2: comment추가하는 input 관리해줘야겟지
  const [inputValue, setInputValue] = useState("");
  const [id, setId] = useState(formData.length);
  // TODO 3: comment Form 제출됐을때 실행되는 함수 만들어줘
  // TODO 4: commet Delete 하는 함수 만들어죠
  const handleChange = (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
  };
  useEffect(() => {
    setComment({
      ...comment,
      content: inputValue,
      id: id,
    });
  }, [inputValue]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(comment.id);
    const newFormData = [...formData, comment];
    setFormData(newFormData);
  };
  useEffect(() => {
    setInputValue("");
    setId(id + 1);
    //onsole.log(formData);
  }, [formData]);
  return (
    <div className="w-full mt-5 self-start">
      <h1 className="text-3xl font-bold mt-5 mb-3">Comments</h1>
      {formData &&
        formData.map((el, index) => (
          <div>
            <CommentElement
              commentId={el.id}
              comments={formData}
              setFormData={setFormData}
              id={id}
              setId={setId}
              index = {index}
            />
          </div>
        ))}
      <form onSubmit={onSubmit}>
        <div className="flex justify-between w-full">
          <input
            className="input mt-10 py-2 "
            type="text"
            placeholder="댓글을 입력해주세요"
            onChange={handleChange}
            value={inputValue}
          />
          <button className="button mt-10 mx-4 py-2 px-10">comment</button>
        </div>
      </form>
      <form></form>
    </div>
  );
};

export default Comment;
