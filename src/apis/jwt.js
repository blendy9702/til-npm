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
