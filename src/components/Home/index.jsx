import React from "react";
import "./Home.css";
import Tags from "../Tags";
import Post from "../Post";

const Home = () => {
  const posts = [
    {
      title: "날씨가 좋네요",
      content: "비 오는데요?",
    },
    {
      title: "멋쟁이",
      content: "사자~~",
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
  ];

  return (
    <div className="home-wrapper">
      <div className="posts-outer-wrapper">
      {posts.map((e) => (
        <Post key={e.title} title={e.title} content={e.content}/>
      ))}
      </div>
      <Tags />
    </div>
  );
};

export default Home;
