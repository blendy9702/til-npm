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
    // dispatch( addTodo("안녕"))
    addTodo: (state, action) => {
      state.push({ id: Date.now(), title: action.payload, completed: false });
    },

    // action id: 기존아이디
    // dispatch( toggleTodo("6421456"))
    toggleTodo: (state, action) => {
      // 배열.find 는 true 인 요소를 찾는다.
      const todo = state.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // action id: 기존아이디
    // dispatch(deleteTodo(45345345))
    deleteTodo: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});
// dispatch action 함수 내보내기
export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
// 기본 리듀서를 내보냄
export default todoSlice.reducer;
