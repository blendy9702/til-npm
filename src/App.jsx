import { useEffect } from "react";
import axiosInstance from "./apis/fetch";
import jwtAxios from "./apis/jwt";
import { removeCookie, setCookie } from "./utils/cookie";
import { useRecoilState } from "recoil";

function App() {
  const [user, setUser] = useRecoilState();
  const loginApi = async () => {
    try {
      // 여기는 일반 axios 로 로그인을 하고 jwt 를 발급 받음
      const res = await axiosInstance.post("/api/user/access-token", {
        email: "qgq0520@naver.com",
        upw: "1234",
      });
      // 성공시 리턴되는 jwt 키를 쿠키에 보관한다.
      setCookie("accseeToken", res.resultData);
      // 사용자의 정보를 App 전체에서 접근하려 한다
      // useRecoilState 를 가지고서 앱 전체에서 활용한다.
    } catch (error) {
      console.log(error);
      // 실패시 jwt 를 지워주는 코드 쿠키에서 제거
      removeCookie("accseeToken");
    }
  };
  useEffect(() => {
    loginApi();
  }, []);

  // jwt 인증키를 반드시 필요로 한 axios 호출
  const userInfo = async () => {
    try {
      const res = await jwtAxios.get("/api/user");
      setUser({ ...res.data });
      console.log(res);
      // Recoil 정보 업데이트 하기
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={userInfo}>JWT 를 호출하다</button>
    </div>
  );
}
export default App;
