import axios from "axios";

// 누구나 접근 가능한 API들
export const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Token 있어야 접근 가능한 API들
export const instanceWithToken = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instanceWithToken.interceptors.request.use(
  (config) => {
    // 요청을 보내기전 수행할 일
    const accessToken = localStorage.getItem("access_token");
    console.log("Access Token:", accessToken);

    if (!accessToken) {
      // token 없으면 리턴
      return;
    } else {
      // token 있으면 헤더에 담아주기 (Authorization은 장고에서 인식하는 헤더 key - 상황에 따라 다른 이름으로 사용 가능)
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // 오류 요청을 보내기전 수행할 일
    console.log("Requset Error!!");
    return Promise.reject(error);
  }
);

instanceWithToken.interceptors.response.use(
  (response) => {
    // 응답 데이터를 가공, .then() 으로 이어짐
    console.log("Interceptor Response!!");
    return response;
  },
  (error) => {
    // 오류 응답을 처리, .catch()으로 이어진다.
    console.log("Response Error!!");
    console.log(error);
    return Promise.reject(error);
  }
);
