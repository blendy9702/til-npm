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
  ufile: yup
    .mixed()
    .test("required", "파일은 필수 입니다.", value => {
      return value && value.length > 0;
    })
    .test("filesize", "파일 크기는 2MB 이하만 가능합니다.", value => {
      return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB 이하
    }),

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
});

function App() {
  // register : form 요소를 관리
  // handleSubmit : form 데이터 전송시 처리
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
    mode: "onChange",
  });

  useEffect(() => {
    // 강제로 값 지정
    setValue("email", "");
  }, []);

  useEffect(() => {
    // trigger();
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
        <input {...register("uid")} placeholder="홍길동" />
        {/* 오류메시지 */}
        <p style={{ color: "red" }}>{errors.uid?.message}</p>

        <label>이메일</label>
        <input {...register("email")} placeholder="GG@GG.net" />
        <p style={{ color: "red" }}>{errors.email?.message}</p>

        <label>비밀번호</label>
        <input type="password" {...register("upw")} />
        <button type="submit">제출</button>
        <p style={{ color: "red" }}>{errors.upw?.message}</p>

        <label>파일첨부</label>
        <input type="file" {...register("ufile")} />
        <p style={{ color: "red" }}>{errors.ufile?.message}</p>

        <label>사진파일첨부</label>
        <input
          type="file"
          {...register("uimg")}
          accept="image/png, imge/jpeg"
        />
        <p style={{ color: "red" }}>{errors.uimg?.message}</p>
      </form>
    </div>
  );
}

export default App;
