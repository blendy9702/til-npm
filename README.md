# tailwindcss

- [링크](https://tailwindcss.com/)

## 셋팅

- npm
  : `npm install -D tailwindcss postcss autoprefixer`
  : `npx tailwindcss init`
  : tailwind.config.js

  ```js
  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Vite 프로젝트에 맞는 파일 확장자 추가
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  ```

  :index.css

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

  :vite.config.js

  ```js
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "tailwindcss";

  // https://vite.dev/config/
  export default defineConfig({
    plugins: [react()],
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
  });
  ```

- Extension
  : Tailwind CSS IntelliSense 설치

## 참고사항

: 리액트 프로젝트 생성하는 법 2가지

- CRA (요즘은 사용추천 안함.)
  : proxy 설정이 다르다.
  : tailwind 셋팅도 다르다.

- Vite
  : proxy 설정이 다르다.
  : tailwind 셋팅도 다르다.

## 셋팅 확인

```jsx
function App() {
  return (
    <div className="bg-gray-400 min-h-screen flex items-center justify-center">
      <div className="text-4xl font-bold text-blue-500">Hello Tailwind :D</div>
    </div>
  );
}
export default App;
```

### 1. 레이아웃

- FlexBox

```jsx
function App() {
  return (
    <div className="flex">
      <div className="flex-1 bg-blue-500">Item 1</div>
      <div className="flex-1 bg-green-500">Item 2</div>
    </div>
  );
}
export default App;
```

: justify-start, justify-center, justify-end, justify-between, justify-around, justify-evenly
: items-start, items-center, items-end

- Grid

```jsx
function App() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-red-500">1</div>
      <div className="bg-blue-500">2</div>
      <div className="bg-green-500">3</div>
      <div className="bg-red-500">1</div>
      <div className="bg-blue-500">2</div>
      <div className="bg-green-500">3</div>
    </div>
  );
}
export default App;
```

: grid-cols-2, grid-cols-4
: gap-2, gap-4

- padding, margin

```jsx
function App() {
  return <div className="p-4 m-4 bg-yellow-300">hello</div>;
}
export default App;
```

### 3. Typography

- 글자 크기
  : text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-4xl
- 글자 색상
  : text-red-500, text-blue-600, text-gray-700

- 폰트 스타일
  : font-thin, font-normal, font-bold, font-extrabold

### 4. 배경

- 배경 색상
  : bg-red-500, bg-green-600, bg-gray-700
- 배경 이미지
  : bg-cover, bg-contain, bg-center

```jsx
<div class="bg-cover bg-center h-40" style="background-image: url('image.jpg')">
  Background Image Example
</div>
```

```jsx
<div
  className="bg-cover bg-center h-40"
  style={{ backgroundImage: "url('image.jpg')" }}
>
  Background Image Example
</div>
```

### 5. Borders

- 테두리
  : border, border-2, border-4
- 테두리 색상
  : border-red-500, border-gray-300
- 둥근 테두리
  : rounded, rounded-full, rounded-lg

### 6. shadow

: shadow-sm, shadow, shadow-lg, shadow-xl

### 7. 반응형

- sm: 640px 이상
- md: 768px 이상
- lg: 1024px 이상
- xl: 1280px 이상
- 2xl: 1536px 이상

```jsx
<div className="bg-gray-100 p-4 sm:bg-blue-500 md:bg-green-500 lg:bg-red-500">
  Responsive Background Color
</div>
```

### 8. 애니메이션

- 트랜지션
  : transition, duration-300, ease-in-out

  ```jsx
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
    Hover Me
  </button>
  ```

- 애니메이션
  : animate-spin, animate

  ```jsx
  <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
  ```

## 커스터마이징

- tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Vite 프로젝트에 맞는 파일 확장자 추가
  ],
  theme: {
    extend: {
      // 우리만의 서비스에 사용할 색상 추가
      color: {
        primary: "#1E40AF",
        secondary: "#64748B",
      },
    },
  },
  plugins: [],
};
```

```jsx
function App() {
  return <div className="bg-primary text-secondary">색상</div>;
}
export default App;
```

## 컴포넌트 스타일링

- /src/component/ui 폴더
  : button.jsx

```jsx
/* eslint-disable react/prop-types */
export default function Button({ label, onClick }) {
  const baseStyle = "px-4 py-2 font-bold rounded";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-700",
    secondary: "bg-grey-500 text-white hover:bg-grey-700",
    danger: "bg-red-500 text-white hover:bg-red-700",
  };
  return (
    <button className={`${baseStyle} ${variants["primary"]}`} onClick={onClick}>
      {label}
    </button>
  );
}
```

```jsx
import Button from "./components/ui/button";

function App() {
  return (
    <>
      <Button
        label="Submit"
        variant="primary"
        onClick={() => console.log("gogo")}
      />

      <Button label="Submit" variant="secondary" />
      <Button label="Submit" variant="danger" />
    </>
  );
}
export default App;
```

## CSS 클래스 그룹화 컴포넌트 스타일링

- 너무 긴 클래스명들을 줄여서 사용.
- `npm install clsx`
- `/src/ui 폴더` 생성
- Alert.jsx

```jsx
import clsx from "clsx";

/* eslint-disable react/prop-types */
export function Alert({ message, type }) {
  return (
    <div
      className={clsx(
        "p-4 rounded",
        type === "success" && "bg-green-100 text-green-500",
        type === "error" && "bg-red-100 text-red-500",
        type === "warning" && "bg-yellow-100 text-yellow-500",
      )}
    >
      {message}
    </div>
  );
}
export default Alert;
```

- App.jsx

```jsx
import Alert from "./components/ui/Alert";

function App() {
  return (
    <div>
      <Alert type="success" message="hello" />
      <Alert type="error" message="hello" />
      <Alert type="warning" message="hello" />
    </div>
  );
}
export default App;
```

## @apply 추상화 css

- index.css
  : 반복해서 사용하는 클래스 모음

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.btn {
  @apply px-4 py-2 font-bold rounded;
}

.btn-primary {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.btn-secondary {
  @apply bg-gray-500 text-white hover:bg-gray-600;
}
```

```jsx
function App() {
  return (
    <div>
      <button className="btn btn-primary">Submit</button>
      <button className="btn btn-secondary ">Cancel</button>
    </div>
  );
}
export default App;
```

## Tailwind 설정 확장

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Vite 프로젝트에 맞는 파일 확장자 추가
  ],
  theme: {
    extend: {
      // 우리만의 서비스에 사용할 색상 추가
      colors: {
        brand: {
          light: "#3B82F6",
          DEFAULT: "#1E40AF",
          dark: "#1E3A8A",
        },
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
    },
  },
  plugins: [],
};
```

```jsx
function App() {
  return (
    <div className="bg-brand text-brand-light p-72">
      Custom Colors and Spacing
    </div>
  );
}
export default App;
```
