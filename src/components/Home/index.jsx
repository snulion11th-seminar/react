import React from "react";
import "./Home.css";
import Tags from "../Tags";
import Post from "../Post";

const Home = () => {
  const posts = [
    {
      id : 1,
      title: "날씨가 좋네요",
      content: "비 오는데요?",
    },
    { 
      id : 2,
      title: "멋쟁이",
      content: "사자~~",
    },
    {
      id : 3,
      title: "쿠쿠루삥뽕",
      content: "안녕",
    },
    {
      id : 4,
      title: "오늘 뒷풀이 가는 사람?",
      content: "저요!",
    },
    {
      id : 5,
      title: "오늘 할 일",
      content: "아침에 일어나기",
    },
  ];

  return (
    <div className="home-wrapper">
      <div className="posts-outer-wrapper">
      {posts.map((post, index) => (
        <Post key={post.id} title={post.title} content={post.content}/>
      ))}
      </div>
      <Tags />
    </div>
  );
};

export default Home;
