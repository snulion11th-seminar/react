const comments = [
  {
    id: 1,
    content: "comment1",
    created_at: "2023-04-18T15:09:43Z",
    post: 1,
    author: {
      id: 2,
      username: "user2",
    },
  },
  {
    id: 2,
    content: "comment2",
    created_at: "2023-05-16T15:09:43Z",
    post: 1,
    author: {
      id: 1,
      username: "user1",
    },
  },
  {
    id: 3,
    content: "comment3",
    created_at: "2023-05-16T19:09:43Z",
    post: 2,
    author: {
      id: 3,
      username: "user3",
    },
  },
];

export default comments;
