# KKO 로그인

- 카카오 개발자 등록 : https://developers.kakao.com
- 참고 : https://chunws13.tistory.com/63#google_vignette

## 앱 등록 과정

- 과정 1
  ![Image](https://github.com/user-attachments/assets/0cbf37da-bfca-4cc9-91fb-7d6b03f48c3a)
- 과정 2
  ![Image](https://github.com/user-attachments/assets/901310c6-b332-48c7-890c-67f7a6ea8b4f)
- 과정 3
  ![Image](https://github.com/user-attachments/assets/bf7062f7-20fd-4a1d-a242-071906de0b8a)
- 과정 4
  ![Image](https://github.com/user-attachments/assets/7bc851fc-bc59-4c15-9751-c8c74411fe05)
- 과정 5  
  ![Image](https://github.com/user-attachments/assets/437ecb10-793c-4084-b7da-265a217f12f5)
- 과정 6 (리다이렉트 주소 작성)
  ![Image](https://github.com/user-attachments/assets/8b7b1913-0bd4-4d89-9ab7-e65b8bfc0650)
- 과정 7
  ![Image](https://github.com/user-attachments/assets/dace1dc0-8513-41b1-bc31-9fcf9f48a9c8)
- 과정 8
  ![Image](https://github.com/user-attachments/assets/6ee23c01-962a-4957-bf08-15c71ac6f6bb)
- 과정 9 (동의항목)
  ![Image](https://github.com/user-attachments/assets/1899513d-ebe8-41b9-b1c5-083208f6fde8)
- 과정 10
  ![Image](https://github.com/user-attachments/assets/7bab3a0e-9c2c-47dd-a690-086a284254f7)
- 과정 11 (앱 권한 신청)
  ![Image](https://github.com/user-attachments/assets/ce546b2e-e77a-4478-beae-c5e800483b5a)
- 과정 12 (비즈니스 권한 추가)

## env 파일 작성

- vite 프로젝트이므로 접두어 `VITE_` 를 붙여야 한다.

```txt
VITE_KKO_MAP_KEY=map 키
VITE_KKO_REST_API_KEY=rest api 키
VITE_KKO_LOGIN_JS_API_KEY=js 키
```

## 카카오 로그인 기능 구현

- `/src/kko 폴더` 생성
- `/src/kko/kkoapi.js 파일` 생성

```js
// REST Key 처리
const rest_api_key = import.meta.env.VITE_KKO_REST_API_KEY;
// 카카오 로그인시 토큰 API 경로
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인 성공시 이동할 경로
const redirect_uri = "http://localhost:5173/member/kko";
// 카카오 로그인 후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};
```

## 회원가입 페이지 구성

- `/src/Join.jsx`

```jsx
import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "./kko/kkoapi";

function Join() {
  const kakaoLogin = getKakaoLoginLink();
  return (
    <div>
      <h1>카카오 로그인</h1>
      <div>
        <Link to={kakaoLogin}>카카오 로그인</Link>
      </div>
    </div>
  );
}

export default Join;
```

## 라우터 구성

- App.jsx

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./Join";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/login" element={<h1>로그인</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## 인증키를 이용한 사용자 정보알아내기

- 카카오 인증 후 정보 파악하기 위한 페이지 구성
- `src/pages/member/After.jsx`

```jsx
import { useSearchParams } from "react-router-dom";

function After() {
  // 카카오 인증 알아내기
  // http://localhost:5173/member/kko?code=jAP3q9kan1tsRFA1IOYPw89xasovPu4twfaFHox-x3aOSM3Q1SWi0QAAAAQKPCJSAAABlNPHPDrdCc_9be4aqQ
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  //   searchParams 에서 code 추출
  const authCode = URLSearchParams.get("code");
  return <div>인가키 {authCode}</div>;
}

export default After;
```

- 카카오 인가 정보 파악하기 위한 라우터 구성
- `/src/App.jsx` 추가

```jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./Join";
import After from "./pages/member/After";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>}></Route>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/member/kko" element={<After />}></Route>
        <Route path="/login" element={<h1>로그인</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## 인가 키 생성후 Access Token 요청하기

- 인가키를 이용해서 `Access Token` 을 박급받고
- 이후로는 `Access Token` 을 이용해서 여러가지 정보를 호출

```jsx
import axios from "axios";

// REST Key 처리
const rest_api_key = import.meta.env.VITE_KKO_REST_API_KEY;
// 카카오 로그인시 토큰 API 경로
const auth_code_path = "https://kauth.kakao.com/oauth/authorize";
// 카카오 로그인 성공시 이동후 인증키 파악 경로
const redirect_uri = "http://localhost:5173/member/kko";
// 카카오 로그인 후 사용자 정보 API 경로
const kko_user_api = "https://kapi.kakao.com/v2/user/me";
// 카카오 로그인시 활용
export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL;
};

const access_token_url = `https://kauth.kakao.com/oauth/token`;
export const getAccessToken = async authCode => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };
  const params = {
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  };
  const res = await axios.post(access_token_url, params, header);
  const accessToken = res.data.access_token;
  return accessToken;
};
// 토큰을 이용해서 사용자 정보 호출하기
export const getMemberWithAccessToken = async accessToken => {
  try {
    const response = await axios.get(kko_user_api, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
```

## 실제 사용자 정보 호출하기

- `/src/pages/member/After.jsx` 기능 추가 (Accsee Token 발급 및 사용자 정보 출력)

```jsx
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../kko/kkoapi";
import { useEffect, useState } from "react";

const After = () => {
  // 카카오 사용자 정보 보관
  const [userInfo, setUserInfo] = useState(null);

  // 카카오 인가 알아내기
  // http://localhost:5173/member/kko?code=jAP3q9kan1tsRFA1IOYPw89xasovPu4twfaFHox-x3aOSM3Q1SWi0QAAAAQKPCJSAAABlNPHPDrdCc_9be4aqQ
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  // searchparams 에서 code 알아내기
  const authCode = URLSearchParams.get("code");
  // 인가 키를 이용해서 Access Token 을 발급 받자
  const getAccessTokenCall = async () => {
    try {
      // Access Token
      const accessKey = await getAccessToken(authCode);
      console.log("accessKey : ", accessKey);
      // 사용자 정보 호출
      const info = await getMemberWithAccessToken(accessKey);
      console.log("info : ", info);
      // state 보관
      setUserInfo(info);
    } catch (error) {
      console.log(error);
    }
  };
  // 인가 키가 존재한다면 그때 토큰 및 정보 호출
  useEffect(() => {
    getAccessTokenCall();
  }, [authCode]);

  return (
    <div>
      <h1>인가키 {authCode}</h1>
      <h2>KKO 로그인 후 </h2>
      <div>
        <p>아이디 : {userInfo?.id}</p>
        <p>닉네임 : {userInfo?.kakao_account.profile.nickname}</p>
        <p>이메일 : {userInfo?.kakao_account.email}</p>
        <p>
          사용자 사진 :{userInfo?.kakao_account.profile.thumbnail_image_url}{" "}
        </p>
      </div>
    </div>
  );
};
export default After;
```
