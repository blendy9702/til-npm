# react cookie 설치

: 웹 브라우저에 보관(저장 기간 셋팅 가능한 데이터)

- `npm install react-cookie`

# JWT

- JavaScript Web Token (자바스크립트 웹 문자열)
- 많은 회사가 JWT를 사용하지만, 반드시 쓰는건 아니다.
- Token : 길고 복잡한 문자열

## JWT 에는 필수적으로 2가지 종류가 있다.

### 1. Access Token

- API 요청시 (axios, fetch 등) 을 이용해서 정보 요청시 활용
- API 요청시 Accsee 토큰을 내용에 담아 백엔드로 보낸다.
- 모든 호출에 Accsee 토큰이 필요 하지는 않다.

### 2. Refresh Token

- 백엔드에서 만약 JWT 인증키를 발급시 유효시간을 설정한다.
- 백엔드에서 30분을 기본으로 설정한다.
- 필요에 의해서 2시간, 10시간, 3일 등 다양하게 설정 가능하다.

## Proxy 설정하기

- `vite.config.js` 내용 추가

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://112.222.157.156:5223",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

## JWT 용 Axios 설정하기

- 백엔드 연동에 꼭 JWT를 적용 하는것은 아니다.

### 1. JWT 사용 안하는 axiso

- 로그인 API 는 JWT 가 필요없다.
  : 로그인하면 그때 `JWT 가 발급` 된다.
  : 발급된 AccseeToken 은 쿠키 또는 로컬스토리지에 보관한다.
  : Recoil, useState, context에 보관하면 사라진다.
  : 그래서 발급된 AccseeToken 을 쿠키에 보관하기로 함.
- `src/apis 폴더` 생성
- JWT 가 필요없는 axios 생성 (꼭 만들 필요는 없음)
- `fetch.js` 생성

### 2. JWT 사용하는 axios

- `src/apis/jwt.js` 파일 생성
- interceptors 를 설정해야 한다.
- 통상 Requset 하기전에 처리
- 통상 Requset 한 이후 JWT 인증 통과 못한 에러처리.
- 통상 Response 하기전에 처리
- 통상 Response 한 이후 JWT 인증 통과 못한 에러처리.

```js
import axios from "axios";

const jwtAxios = axios.create();
// axios 호출시 사전 옵션을 설정한다.
// 호출 즉 백엔드로 Request 하기전 옵션 붙이기
const beforeRequest = config => {
  console.log("1. 요청전에 먼저 전달", config);
  return config;
};
const failRequest = error => {
  console.log("Error 됨");
  return Promise.reject(error);
};
// Response 즉, 회신 전에 처리함
const beforeRes = res => {
  console.log(" 2. 요청의 결과 전처리", res);
  return res;
};
const faileRes = error => {
  console.log("failRes 에러", error);
  return Promise.reject(error);
};

jwtAxios.interceptors.request.use(beforeRequest, failRequest);
jwtAxios.interceptors.response.use(beforeRes, faileRes);

export default jwtAxios;
```

## JWT 쿠키에 보관하기

- 쿠키를 위한 파일 생성
- `/src/utils/ 폴더` 생성
- `/src/utils/cookie.js 파일` 생성

```js
import { Cookies } from "react-cookie";

const cookies = new Cookies();
// 쿠키에 저장
export const setCookie = (name, value, options) => {
  return cookies.set(name, value, { ...options });
};
// 쿠키에 데이터 읽기
export const getCookie = name => {
  return cookies.get(name);
};
//  쿠키 삭제
export const removeCookie = name => {
  return cookies.remove(name, { path: "/" });
};
```

## JWT 쿠키에 보관하는 과정

- 일반 axios 로 로그인 시도

```js
const loginApi = async () => {
  try {
    // 여기는 일반 axios 로 로그인을 하고 jwt 를 발급 받음
    const res = await axiosInstance.post("/api/user/access-token", {
      email: "qgq0520@naver.com",
      upw: "1234",
    });
    // 성공시 리턴되는 jwt 키를 쿠키에 보관한다.
    setCookie("accseeToken", res.resultData);
  } catch (error) {
    console.log(error);
    // 실패시 jwt 를 지워주는 코드 쿠키에서 제거
    removeCookie("accseeToken");
  }
};
```

- jwt 호출 필요로 하면

```js
import axios from "axios";
import { getCookie, setCookie } from "../utils/cookie";

const jwtAxios = axios.create();
// axios 호출시 사전 옵션을 설정한다.
// 호출 즉 백엔드로 Request 하기전 옵션 붙이기
const beforeRequest = config => {
  // console.log("1. 요청전에 먼저 전달", config);
  // 1. 먼저 쿠키를 읽어온다.
  const accseeToken = getCookie("accseeToken");
  // 2. 인증 키 없는 경구
  if (!accseeToken) {
    // 에러 메시지를 리턴함.
    return Promise.reject({
      reponse: { data: { error: "Login 하고 인증해라" } },
    });
  }
  //  3. 정상적으로 인증키가 있으면
  config.headers.Authorization = `Bearer ${accseeToken}`;
  return config;
};
const failRequest = error => {
  console.log("Error");
  return Promise.reject(error);
};
jwtAxios.interceptors.request.use(beforeRequest, failRequest);

// Response 즉, 회신 전에 처리함
const beforeRes = async res => {
  // console.log(" 2. 요청의 결과 전처리", res);
  // 항상 결과가 정상적으로 오면 혹시 모를 jwt 키 변경이 될 수 있다.
  // accessToken 을 새롭게 호출하고 다시 저장해 준다.
  const result = await axios.get("/api/user/access-token");
  setCookie("accseeToken", result.resultData);
  return res.config;
};
const faileRes = async error => {
  // console.log("failRes 에러", error);
  const result = await axios.get("/api/user/access-token");
  setCookie("accseeToken", result.resultData);
  return Promise.reject(error);
};

jwtAxios.interceptors.request.use(beforeRequest, failRequest);
jwtAxios.interceptors.response.use(beforeRes, faileRes);
export default jwtAxios;
```

## 사용자 정보 recoil 에 보관하기

- 사용자 로그인 API 연동후 정보 저장
- `/src/atoms 폴더` 생성

```js
import { atom } from "recoil";

export const userInfo = atom({
  key: "userInfo",
  default: {
    name: "",
    phone: "",
    birth: "",
    nickName: "",
  },
});
```

- Recoil은 App.jsx 또는 main.js에 Root 배치

```jsx
  // 전연 store 를 활용함.
  <RecoilRoot>
    <App />
  </RecoilRoot>,
```
