import { removeCookie } from "../utils/cookie";
import { instance, instanceWithToken } from "./axios";


// src/api/api.js
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
    window.location.href = "/"; //새로고침 있음
  }
  return response;
};

// 추가!!

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

// 추가!!


//Post 관련 API들
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
export const deletePost = async (id) => {
  const response = await instanceWithToken.delete(`/post/${id}/`);
  if(response.status===204){
    console.log("POST DELETE SUCCESS");
    window.location.href = "/";
  }else{
    console.log("[ERROR] error while deleting post");
  }
    
};

// 과제!!
export const likePost = async (postId) => {
  const response = await instanceWithToken.post(`/post/${postId}/like/`,postId);
  if(response.status===200)
    console.log("LIKE UPDATE SUCCESS");
  else if(response.status===401)
    alert("로그인 후 시도해주세요");
  else
    console.log("[ERROR] error while editing like");
  // console.log(response.data['like_users'].length); 
  //return like count
  return response.data['like_users'].length;
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
  const response = await instanceWithToken.patch(`/comment/${id}/`, data);
  if (response.status === 200) {
    console.log("COMMENT UPDATE SUCCESS");
    window.location.reload();
  } else {
    console.log("[ERROR] error while updating comment");
  }
};

export const getUser =async ()=>{
  const response = await instanceWithToken.get("/account/info/");
  if(response.status === 200){
    console.log("GET USER SUCCESS");
  }else{
    console.log("[ERROR] error while updating comment");
  }
  return response.data;
}

export const getUserProfile = async () => {
  const response = await instanceWithToken.get("/account/profile/");
  if(response.status === 200){
    console.log("GET USER SUCCESS");
  }else{
    console.log("[ERROR] error while updating comment");
  }
  return response.data;
}

export const updateUserProfile = async (data) => {
  const response = await instanceWithToken.patch("/account/profile/",data);
  if(response.status === 200){
    alert("수정되었습니다.");
    console.log("UPDATE USER SUCCESS");
  }else{
    console.log("[ERROR] error while updating comment");
  }
}


// 과제 !!
export const deleteComment = async (id) => {
  const response = await instanceWithToken.delete(`/comment/${id}/`);
  if(response.status===204){
    console.log("COMMENT DELETE SUCCESS");
    window.location.reload();
  }else{
    console.log("[ERROR] error while deleting comment");
  }
};

// 추가!!
export const refreshToken = async (token) => {
  const response = await instance.post("/account/refresh/", { refresh: token });
  if (response.status === 200) {
    console.log("REFRESH TOKEN SUCCESS");
  } else {
    console.log("[ERROR] error while refreshing token");
  }
};