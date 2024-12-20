# react hook form 과 yup

## 1. 설치

- [react hook form 사이트](https://react-hook-form.com/)
- `npm install react-hook-form`
- [yup 사이트](https://github.com/jquense/yup)
- `npm i yup`
- `npm i @hookform/resolvers`
- 참조
  : `npm install react-hook-form yup @hookform/resolvers`

## 2. 참조

- [react-hook-fomr 참조블러그](https://velog.io/@boyeon_jeong/React-Hook-Form)
- [yup 참조블러그](https://velog.io/@boyeon_jeong/Yup-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0)

## 3. 응용

### 3.1. 기본 hook-form 코드

- App.jsx

```jsx
import { useForm } from "react-hook-form";

function App() {
  // register : form 요소를 관리
  // handleSubmit : form 데이터 전송시 처리
  const { register, handleSubmit } = useForm();

  // form 에 담겨진 데이터 전송 처리
  // e.preventDefault() 필요 없음.
  const handleSubmitForm = data => {
    // 모아서 전송할 데이터 (axios.post 전송)
    console.log(data);
  };
  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <label>이름</label>
        <input {...register("name")} />
        <button type="submit">제출</button>
      </form>
    </div>
  );
}

export default App;
```

### 3.2. 기본 yup 유효성 코드 추가

### 3.3. 추가 필드, 추가 유효성 schema 작성

```jsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// schema 를 먼저 생성하자
const loginSchema = yup.object({
  uid: yup.string().required("이름은 필수 입니다."),
  email: yup
    .string()
    .email("유효한 이메일을 입력하세요")
    .required("이메일은 필수 입니다"),
  upw: yup
    .string()
    .min(4, "비밀번호는 최소 4자리입니다.")
    .max(12, "비밀번호는 최대 12자리입니다. ")
    .required("비밀번호는 필수 입니다."),
});

function App() {
  // register : form 요소를 관리
  // handleSubmit : form 데이터 전송시 처리
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // form 에 담겨진 데이터 전송 처리
  // e.preventDefault() 필요 없음.
  const handleSubmitForm = data => {
    // 모아서 전송할 데이터 (axios.post 전송)
    console.log(data);
  };
  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <label>이름</label>
        <input {...register("uid")} />
        {/* 오류메시지 */}
        <p style={{ color: "red" }}>{errors.uid?.message}</p>

        <label>이메일</label>
        <input {...register("email")} />
        <p style={{ color: "red" }}>{errors.email?.message}</p>

        <label>비밀번호</label>
        <input type="password" {...register("upw")} />
        <button type="submit">제출</button>
        <p style={{ color: "red" }}>{errors.upw?.message}</p>
      </form>
    </div>
  );
}

export default App;
```

### 3.4. form 의 name에 `기본 값 넣기`

```jsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: yupResolver(loginSchema),
  // 기본 name 에 해당하는 값
  defaultValues: { uid: "", email: "", upw: "" },
});
```

### 3.5. form을 `초기에 유효성 검사` 실행하기

```jsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// schema 를 먼저 생성하자
const loginSchema = yup.object({
  uid: yup.string().required("이름은 필수 입니다."),
  email: yup
    .string()
    .email("유효한 이메일을 입력하세요")
    .required("이메일은 필수 입니다"),
  upw: yup
    .string()
    .min(4, "비밀번호는 최소 4자리입니다.")
    .max(12, "비밀번호는 최대 12자리입니다. ")
    .required("비밀번호는 필수 입니다."),
});

function App() {
  // register : form 요소를 관리
  // handleSubmit : form 데이터 전송시 처리
  const {
    register,
    handleSubmit,
    // 유효성 검사 즉시 실행
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    // 기본 name 에 해당하는 값
    defaultValues: { uid: "", email: "", upw: "" },
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  // form 에 담겨진 데이터 전송 처리
  // e.preventDefault() 필요 없음.
  const handleSubmitForm = data => {
    // 모아서 전송할 데이터 (axios.post 전송)
    console.log(data);
  };
  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <label>이름</label>
        <input {...register("uid")} />
        {/* 오류메시지 */}
        <p style={{ color: "red" }}>{errors.uid?.message}</p>

        <label>이메일</label>
        <input {...register("email")} />
        <p style={{ color: "red" }}>{errors.email?.message}</p>

        <label>비밀번호</label>
        <input type="password" {...register("upw")} />
        <button type="submit">제출</button>
        <p style={{ color: "red" }}>{errors.upw?.message}</p>
      </form>
    </div>
  );
}

export default App;
```

### 3.6. `유효성 검사 출력 시점` 변경

```jsx
const {
  register,
  handleSubmit,
  // 유효성 검사 즉시 실행
  trigger,
  formState: { errors },
} = useForm({
  resolver: yupResolver(loginSchema),
  // 기본 name 에 해당하는 값
  defaultValues: { uid: "", email: "", upw: "" },
  // 유효성 검사 방식
  mode: "all",
});

useEffect(() => {
  // trigger();
}, [trigger]);
```

### 3.7. `원하는 폼`에 값을 강제로 넣기

```jsx
const {
  register,
  handleSubmit,
  // 유효성 검사 즉시 실행
  trigger,
  setValue,
  formState: { errors },
} = useForm({
  resolver: yupResolver(loginSchema),
  // 기본 name 에 해당하는 값
  defaultValues: { uid: "", email: "", upw: "" },
  // 유효성 검사 방식
  mode: "all",
});

useEffect(() => {
  // 강제로 값 지정
  setValue("email", "GG@GG.net");
}, []);
```

## 4. 파일 관련

```jsx
const loginSchema = yup.object({
    .mixed()
    .test("required", "파일은 필수 입니다.", value => {
      return value && value.length > 0;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", value => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    }),
});
```

```jsx
  <label>파일첨부</label>
  <input type="file" {...register("ufile")} />
  <p style={{ color: "red" }}>{errors.ufile?.message}</p>
```

### 4.2. 기본 파일 처리 - 이미지만

```jsx
  uimg: yup
    .mixed()
    .test("required", "사용자 이미지는 필수 입니다.", value => {
      return value && value.length > 0;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", value => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    })
    .test("fileType", "JPG 또는 PNG 파일만 업로드 가능합니다.", value => {
      return value && ["image/jpeg", "image/png"].includes(value[0]?.type);
    }),
```

```jsx
        <label>사진파일첨부</label>
        <input
          type="file"
          {...register("uimg")}
          accept="image/png, imge/jpeg"
        />
        <p style={{ color: "red" }}>{errors.uimg?.message}</p>
```
