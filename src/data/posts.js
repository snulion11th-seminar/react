const posts = [
  {
    id: 0,
    title: "#1 post",
    content: "My Number one post content",
    author: { id: 0, username: "지현" },
    tags: [
      { id: 0, content: "멋사" },
      { id: 1, content: "개발자" },
      { id: 2, content: "서울대" },
    ],
    like_users: [1, 2],
    created_at: "2023-02-04T07:42:50.658501Z",
  },
  {
    id: 1,
    title: "#2 post",
    content: "My Number two post content",
    author: { id: 1, username: "란경" },
    tags: [
      { id: 0, content: "멋사" },
      { id: 1, content: "낭만걸" },
    ],
    like_users: [0],
    created_at: "2023-02-04T07:42:50.658501Z",
  },
  {
    id: 2,
    title: "#3 post",
    content: "My Number three post content",
    author: { id: 2, username: "진모" },
    tags: [
      { id: 1, content: "가모" },
      { id: 2, content: "등산" },
    ],
    like_users: [],
    created_at: "2023-02-04T07:42:50.658501Z",
  },
  {
    id: 3,
    title: "#4 post",
    content: "My Number four post content",
    author: { id: 3, username: "동민" },
    tags: [
      { id: 1, content: "천재수교과" },
      { id: 2, content: "다래끼" },
    ],
    like_users: [0, 1, 2],
    created_at: "2023-02-04T07:42:50.658501Z",
  },
  {
    id: 4,
    title: "#5 post",
    content: "My Number five post content",
    author: { id: 4, username: "수혁" },
    tags: [
      { id: 0, content: "멋사" },
      { id: 2, content: "연예인" },
    ],
    like_users: [3],
    created_at: "2023-02-04T07:42:50.658501Z",
  },
];

export default posts;
