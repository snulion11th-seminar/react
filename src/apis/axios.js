import axios from "axios";
import { getCookie } from "../utils/cookie";
import { refreshToken } from "./api";

// baseURL, credential, 헤더 세팅
axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken");

// 누구나 접근 가능한 API들
export const instance = axios.create();

// Token 있어야 접근 가능한 API들 - 얘는 토큰을 넣어줘야 해요
export const instanceWithToken = axios.create();

instanceWithToken.interceptors.response.use(
  (response) => {
    console.log("Interceptor Response!!");
    return response;
  },
  async (error) => {
    console.log("Response Error!!");

    const originalRequest = error.config;
    if (error.response.status === 401) {
      //토큰이 만료됨에 따른 에러인지 확인
      const token = getCookie("refresh_token");
      await refreshToken(token); //refresh token 을 활용하여 access token 을 refresh

      return instanceWithToken(originalRequest); //refresh된 access token 을 활용하여 재요청 보내기
    }
    return Promise.reject(error);
  }
);

instanceWithToken.interceptors.response.use(
  (response) => {
    // 서버 응답 데이터를 프론트에 넘겨주기 전 수행할 일
    console.log("Interceptor Response!!");
    return response;
  },
  (error) => {
    // 서버가 오류를 응답했을 때 처리 - 콘솔 찍어주고, 프론트에게 보내지 않고 오류를 발생시킴
    console.log("Response Error!!");
    return Promise.reject(error);
  }
);
