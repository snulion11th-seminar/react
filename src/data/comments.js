const comments = [
  {
    id: 1,
    content: "감기 조심하세요",
    created_at: "2023-03-16T15:09:43Z",
    post: 1,
    author: {
      id: 2,
      username: "user2",
    },
  },
  {
    id: 2,
    content: "많이 아프더라구요",
    created_at: "2023-04-16T15:09:43Z",
    post: 1,
    author: {
      id: 1,
      username: "user1",
    },
  },
  {
    id: 3,
    content: "내일 예비군훈련인데 어떡하죠",
    created_at: "2023-05-16T15:09:43Z",
    post: 1,
    author: {
      id: 3,
      username: "user3",
    },
  },
];

export default comments;
