import { removeCookie } from "../utils/cookie";
import { instance, instanceWithToken } from "./axios";

// Account 관련 API들
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

// GetUser API
// Edit, Delete 권한을 확인하거나, 프로필 페이지를 만들 때 사용하겠죠?
export const getUser = async () => {
  const response = await instanceWithToken.get("/account/info/");
  if (response.status === 200) {
    console.log("GET USER SUCCESS");
  } else {
    console.log("[ERROR] error while updating comment");
  }
  return response.data;
};

// Post 관련 API들
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
    navigate("/");
  } else {
    console.log("[ERROR] error while updating post");
  }
};

//과제 - post 삭제 기능 구현
export const deletePost = async (id, navigate) => {
  const response = await instanceWithToken.delete(`/post/${id}/`);
  if (response.status === 204) {
    console.log("POST DELETE SUCCESS");
    navigate("/");
  } else {
    console.log("[ERROR] error while deleting post");
  }
};

//과제 - post like 기능
export const likePost = async (postId) => {
  const response = await instanceWithToken.post(`/post/${postId}/like/`);
  if (response.status === 200) {
    console.log("POST LIKE SUCCESS");
    window.location.reload();
  } else {
    console.log(response.status);
    console.log("[ERROR] error while liking post");
  }
};

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
  const response = await instanceWithToken.put(`/comment/${id}/`, data);
  if (response.status === 200) {
    console.log("COMMENT UPDATE SUCCESS");
    window.location.reload();
  } else {
    console.log("[ERROR] error while updating comment");
  }
};

//과제 - comment 삭제 기능 구현
export const deleteComment = async (id) => {
  console.log(id);
  const response = await instanceWithToken.delete(`/comment/${id}/`);
  if (response.status === 204) {
    console.log("COMMENT DELETE SUCCESS");
    window.location.reload();
  } else {
    console.log("[ERROR] error while deleting comment");
  }
};

export const getUserInfoAll = async () => {
  const response = await instanceWithToken.get("/account/allinfo/");
  if (response.status === 200) {
    console.log(response.data);
  } else {
    console.log("Error");
  }
  return response.data;
};

export const updateUserInfo = async (data) => {
  const response = await instanceWithToken.put(`/account/allinfo/`, data);
  if (response.status === 200) {
    console.log("USER INFO UPDATE SUCCESS");
    // window.location.reload();
  } else {
    console.log("[ERROR] error while updating user info");
  }
  return response.data;
};

export const getMyPosts = async () => {
  const response = await instanceWithToken.get("/post/my/");
  return response.data;
};

export const refreshToken = async (token) => {
  const response = await instance.post("/account/refresh/", { refresh: token });
  if (response.status === 200) {
    console.log("REFRESH TOKEN SUCCESS");
  } else {
    console.log("[ERROR] error while refreshing token");
  }
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
