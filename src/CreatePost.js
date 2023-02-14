import React from "react";
import "./CreatePost.css";
import Tags from "./components/Tags";

const CreatePost = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [posts, setPosts] = React.useState([
    {
      title: "날씨가 좋네요",
      content: "정말요~",
    },
    {
      title: "하하하하",
      content: "멋쟁이들",
    },
    {
      title: "쿠쿠루삥뽕",
      content: "안녕",
    },
    {
      title: "오늘 뒷풀이 가는 사람?",
      content: "저요!",
    },
    {
      title: "오늘 할 일",
      content: "아침에 일어나기",
    },
  ]);

  const updateTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
  };

  const updateContent = (e) => {
    const value = e.target.value;
    setContent(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setPosts([...posts, { title, content }]);
  };

  if (submitted) {
    return (
      <div className="posts-wrapper">
        {posts.map((e) => (
          <div className="post-detail-wrapper">
            <div className="post-detail-title">제목 : {e.title}</div>
            <div className="post-detail-content">내용 : {e.content}</div>
          </div>
        ))}
        <Tags />
      </div>
    );
  } else
    return (
      <form id="create-post-wrapper" onSubmit={onSubmit}>
        <h3 id="create-post-header">new post</h3>
        <span id="title">title</span>
        <input
          type="text"
          id="create-post-title-input"
          onChange={updateTitle}
        />
        <span id="content">content</span>
        <textarea
          name="content"
          cols="30"
          rows="10"
          id="create-post-content-input"
          onChange={updateContent}
        ></textarea>
        <button id="create-post-btn">제출하기</button>
      </form>
    );
};

export default CreatePost;
