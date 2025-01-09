import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todoSlice = createSlice({
  name: "todoSlice",
  // 최초로 보관할 데이터
  initialState: [initialState],
  // reduver 함수 : store 의 todoSlice의 state 를 갱신
  //   state는 slice에 보관하고 있는 데이터
  // action은 state에 업데이트할 새로운 데이터
  reducers: {
    // action {id:Date.now(), title: "안녕하세요", completend: false}
    addTodo: (state, action) => {
      state.push({ id: Date.now(), title: action.payload, completend: false });
    },

    // action id: 기존아이디
    toggleTodo: (state, action) => {},
    // action id: 기존아이디
    deleteTodo: (state, action) => {},
  },
});
