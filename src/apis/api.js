import { instance, instanceWithToken } from "./axios";
import { removeCookie } from "../utils/cookie";

// src/api/api.js
// Account 관련 API들

export const refreshToken = async (token) => {
  const response = await instance.post("/account/refresh/", { refresh: token });
  if (response.status === 200) {
    console.log("REFRESH TOKEN SUCCESS");
  } else {
    console.log("[ERROR] error while refreshing token");
  }
};

export const signIn = async (data) => {
  const response = await instance.post("/account/signin/", data);
  if (response.status === 200) {
    window.location.href = "/";
  } else {
    console.log("Error");
  }
};

export const signUp = async (data) => {
  const response = await instance.post("/account/signup/", data);
  if (response.status === 200) {
    window.location.href = "/";
  }
  return response;
};

export const logOut = async (token) => {
  const response = await instanceWithToken.post("/account/logout/", {
    refresh: token,
  });
  if (response.status === 204) {
    console.log("REFRESH TOKEN SUCCESS");

    removeCookie("refresh_token");
    removeCookie("access_token");

    window.location.reload();
  } else {
    console.log("[ERROR] error while refreshing token");
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

//유저 정보를 수정하는 view를 불러옴 ({수정할 key: 수정할 value} 형태로 데이터를 /account/edit으로 보내면 수정된 유저 객체 전체를 반환하는 view)
export const editUser = async (data) => {
  const response = await instanceWithToken.patch("/account/edit/", data);
  if (response.status === 200) {
    console.log("EDIT USER SUCCESS");
    window.location.reload();
  } else {
    console.log("[ERROR] error while editing user");
  }
};

export const getPosts = async () => {
  const response = await instance.get("/post/");
  return response.data;
};

export const getPost = async (id) => {
  const response = await instance.get(`/post/${id}/`);
  return response.data;
};

export const createPost = async (data, navigate) => {
  const response = await instanceWithToken.post("/post/", data);
  if (response.status === 201) {
    console.log("POST SUCCESS");
    navigate("/");
  } else {
    console.log("[ERROR] error while creating post");
  }
};

export const updatePost = async (id, data, navigate) => {
  const response = await instanceWithToken.patch(`/post/${id}/`, data);
  if (response.status === 200) {
    console.log("POST UPDATE SUCCESS");
    navigate(-1);
  } else {
    console.log("[ERROR] error while updating post");
  }
};

// 과제!!
export const deletePost = async (id, navigate) => {
  const response = await instanceWithToken.delete(`/post/${id}/`);
  if (response.status === 204) {
    console.log("POST DELETE SUCCESS");
    navigate("/");
  } else {
    console.log("[ERROR] failed to delete post");
  }
};

// 과제!!
export const likePost = async (postId) => {
  const response = await instanceWithToken.post(`/post/${postId}/like/`);
  if (response.status === 200) {
    console.log("LIKE SUCCESS");
    return response.data;
  } else {
    console.log("[ERROR] failed to like post");
  }
};

// src/apis/api.js
// ...
// 추가

// Tag 관련 API들
export const getTags = async () => {
  const response = await instance.get("/tag/");
  return response.data;
};

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
export const getComments = async (postId) => {
  const response = await instance.get(`/comment/?post=${postId}`);
  return response.data;
};

export const createComment = async (data) => {
  const response = await instanceWithToken.post("/comment/", data);
  if (response.status === 201) {
    console.log("COMMENT SUCCESS");
    window.location.reload(); // 새로운 코멘트 생성시 새로고침으로 반영
  } else {
    console.log("[ERROR] error while creating comment");
  }
};

export const updateComment = async (id, data) => {
  const response = await instanceWithToken.patch(`/comment/${id}/`, data);
  if (response.status === 200) {
    console.log("COMMENT UPDATE SUCCESS");
    window.location.reload();
  } else {
    console.log("[ERROR] error while updating comment");
  }
};

// 과제 !!
export const deleteComment = async (id) => {
  const response = await instanceWithToken.delete(`/comment/${id}/`);
  if (response.status === 204) {
    console.log("COMMENT DELETE SUCCESS");
    window.location.reload();
  } else {
    console.log("[ERROR] error while deleting comment");
  }
};
