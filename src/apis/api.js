import { instance, instanceWithToken } from "./axios";

//백엔드의 명세를 잘 봐야한다. IF else 처리할 때 상태 처리
// src/api/api.js
// Account 관련 API들

//signin
export const signIn = async (data) => {
  const response = await instance.post("/account/signin/", data);
  if (response.status === 200) {
    window.location.href = "/";
  } else {
    console.log("Error");
  }
};

//signup
export const signUp = async (data) => {
  const response = await instance.post("/account/signup/", data);
  if (response.status === 200) {
    window.location.href = "/";
  }
  return response;
};

//post 관련 api들

//전부 가져오기
export const getPosts = async () => {
  const response = await instance.get("/post/");
  return response.data;
};

//하나만 가져오기
export const getPost = async (id) => {
  const response = await instance.get(`/post/${id}/`);
  return response.data;
};

// create post
export const createPost = async (data, navigate) => {
  const response = await instanceWithToken.post("/post/", data);
  if (response.status === 201) {
    console.log("POST SUCCESS");
    navigate("/");
  } else {
    console.log("[ERROR] error while creating post");
  }
};

//update post
export const updatePost = async (id, data, navigate) => {
  const response = await instanceWithToken.patch(`/post/${id}/`, data);
  if (response.status === 200) {
    console.log("POST UPDATE SUCCESS");
    navigate(-1);
  } else {
    console.log("[ERROR] error while updating post");
  }
};

//----과제----

export const deletePost = async (id, navigate) => {
  const response = await instanceWithToken.delete(`/post/${id}/`);
  if (response.status === 200) {
    console.log("POST DELETE SUCCESS");
    navigate(-1);
  } else {
    console.log("[ERROR] error while deleting post");
  }
};

// 과제!!
export const getLikePost = async (postId) => {
  try {
    const response = await instanceWithToken.post(`/post/${postId}/like/`);
    if (response.status === 200) {
      console.log("LIKE SUCCESS");
      return response.data; // Return updated post data
    } else {
      console.log("[ERROR] Error while like post");
      return null; // Indicate unsuccessful like
    }
  } catch (error) {
    console.error("[ERROR] Error while like post:", error);
    throw error;
  }
};

// Tag 관련 API들
//전체태그 가져오기
export const getTags = async () => {
  const response = await instance.get("/tag/");
  return response.data;
};

//태그 만들기
export const createTag = async (data) => {
  const response = await instanceWithToken.post("/tag/", data);
  if (response.status === 201) {
    console.log("TAG SUCCESS");
  } else {
    console.log("[ERROR] error while creating tag");
  }
  return response; // response 받아서 그 다음 처리
};

// Comment 관련 API들
//모든 코멘트 가져오기
export const getComments = async (postId) => {
  const response = await instance.get(`/comment/?post=${postId}`);
  return response.data;
};

//코멘트 만들기
export const createComment = async (data) => {
  const response = await instanceWithToken.post("/comment/", data);
  if (response.status === 201) {
    console.log("COMMENT SUCCESS");
    window.location.reload(); // 새로운 코멘트 생성시 새로고침으로 반영
  } else {
    console.log("[ERROR] error while creating comment");
  }
};

//코멘트 update
export const updateComment = async (id, data) => {
  const response = await instanceWithToken.patch(`/comment/${id}/`, data);
  if (response.status === 200) {
    console.log("COMMENT UPDATE SUCCESS");
    window.location.reload();
  } else {
    console.log("[ERROR] error while updating comment");
  }
};

// ---------과제 !!
export const deleteComment = async (id) => {
  const response = await instanceWithToken.delete(`/comment/${id}/`);
  if (response.status === 200) {
    console.log("COMMENT DELETE SUCCESS");
    window.location.reload();
  } else {
    console.log("[ERROR] error while deleting comment");
  }
};

export const getUser = async () => {
  const response = await instanceWithToken.get("/account/info/");
  if (response.status === 200) {
    console.log("GET USER SUCCESS");
  } else {
    console.log("[ERROR] error while updating comment");
  }
  return response.data;
};
