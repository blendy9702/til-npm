import { atom } from "recoil";

export const todoListAtom = atom({
  key: "todoListAtom", // atiom 구분 문자열 즉, 키값
  default: [], // 기본 할일 배열의 목록
});
