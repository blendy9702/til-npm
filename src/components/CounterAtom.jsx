import { useRecoilState } from "recoil";
import { counterAtom, loginAtion } from "../atoms/counterAtom";

const CounterAtom = () => {
  const [count, setCount] = useRecoilState(counterAtom);
  const [isLogin, setIsLogin] = useRecoilState(loginAtion);
  return (
    <div>
      <h1>로그인 상태 : {isLogin ? "로그인 :)" : "로그아웃 :("}</h1>
      <button onClick={() => setIsLogin(true)}>로그인</button>
      <button onClick={() => setIsLogin(false)}>로그아웃</button>
      <h1>CounterAtom : {count}</h1>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(count - 1)}>감소</button>
      <button onClick={() => setCount(0)}>리셋</button>
    </div>
  );
};
export default CounterAtom;
