# Ant Design

- 알리바바
- UI CSS 수정이 엄청 어렵다.
- 각 컴포넌트 사용법 학습에 시간이 오래 걸린다.
- 틈나는 대로 하나씩 공부해 보자.
- UI 코딩 및 CSS 작업 시간 간축 및 통일성 있는 UI 구성 가능.
- https://ant.design/components/overview

## 설치

- `npm install antd --save`

## 실습

- /srtc/components/JoinForm.jsx

```jsx
import { Button, Form, Input } from "antd";

const JoinForm = () => {
  // 1. 기본값 넣기 (default)
  const initialValues = {
    userid: "hong",
    userpass: "hello",
    nickname: "길동",
    email: "a@a.net",
  };

  // 2. 라벨 넣기

  // 3. placeholder 넣기

  // 4. 필수값 표현하기

  // 5. 필수값 안내 메시지 표시하기

  // 6. 각 필드의 입력 중인 값 알아내기
  const onChangeField = _field => {
    console.log(_field);
  };

  // 7. 확인 버튼시 최종 입력값
  const onFinished = values => {
    console.log(values);
  };

  return (
    <div>
      <Form
        style={{ width: 600, margin: "0 auto" }}
        initialValues={initialValues}
        onFieldsChange={(changeFields, allFields) =>
          onChangeField(changeFields)
        }
        onFinish={valuse => onFinished(valuse)}
      >
        <Form.Item
          name={"userid"}
          label="아이디"
          required={true}
          rules={[
            { required: true, message: "아이디는 필수 사항입니다." },
            { min: 4, message: "아이디는 4글자 이상입니다." },
            { max: 8, message: "아이디는 8글자 이하입니다." },
          ]}
        >
          <Input placeholder="아이디를 입력하세요." />
        </Form.Item>
        <Form.Item
          name={"userPass"}
          label="비밀번호"
          required={true}
          rules={[
            { required: true, message: "비밀번호는 필수 항복입니다." },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "비밀번호는 최소 8자 이상이며, 대소문자와 숫자를 포함해야 합니다.",
            },
          ]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요." />
        </Form.Item>
        <Form.Item name={"nickname"} label="닉네임">
          <Input placeholder="닉네임을 입력하세요." />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="이메일"
          rules={[
            { required: true, message: "이메일은 필수 항복입니다." },
            { type: "email", message: "이메일 형식에 맞지 않습니다." },
          ]}
        >
          <Input placeholder="이메일을 입력하세요." />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit"></Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default JoinForm;
```

## 실습 2(비밀번호 비교 예제)

- `/src/App.jsx`

```jsx
import PwForm from "./components/PwForm";

function App() {
  return (
    <div>
      <PwForm />
    </div>
  );
}
export default App;
```

- `/src/component/PwForm.jsx 파일 생성`
- 기본코드

```jsx
import { Button, Form, Input } from "antd";

const PwForm = () => {
  return (
    <div>
      <h1>비밀번호 검증예제</h1>
      <Form>
        <Form.Item
          name={"password"}
          label="비밀번호"
          rules={[
            { required: true, message: "비밀번호는 필수 항목입니다." },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "비밀번호는 최소 8자 이상이며, 대소문자와 숫자를 포함해야 합니다.",
            },
          ]}
        >
          <Input.Password placeholder="비밀번호를 입력해주세요." />
        </Form.Item>
        <Form.Item
          name={"passwordConfirm"}
          label="비밀번호 확인"
          rules={[
            { required: true, message: "비밀번호 확인은 필수 항목입니다." },
          ]}
        >
          <Input.Password placeholder="비밀번호를 확인해주세요." />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">확인</Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default PwForm;
```
