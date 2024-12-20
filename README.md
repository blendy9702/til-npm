# react-icon

## 1. 설치

- [npm](https://www.npmjs.com/package/react-icons)
- [사이트](https://react-icons.github.io/react-icons/)
- `npm i react-icons`

## 2. 참조

- [참조블로그](https://velog.io/@chaevivi/React-React-Icons-%EC%82%AC%EC%9A%A9%EB%B2%95)

## 3. 활용

```jsx
import { IoLogoReddit } from "react-icons/io5";

function App() {
  const point = 5; // 총 별점
  const rate = 3; // 별점
  return (
    <>
      <div style={{ fontSize: 100 }}>
        <IoLogoReddit />
      </div>
      <h1>당신의 별점은</h1>
      <div>
        {[...Array(point)].map((item, index) => {
          return (
            <IoLogoReddit
              key={index}
              style={{ fontSize: 50, color: index < rate ? "gold" : "gray" }}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
```
