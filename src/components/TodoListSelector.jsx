import { useRecoilValue } from "recoil";
import { completedTodosSelector } from "../selectors/todoSelectors";

function TodoListSelector() {
  // 나는 todos atoms에서 completed:true 만 가져오겠다!
  const completedTodos = useRecoilValue(completedTodosSelector);
  return (
    <div>
      <h1>완료된 할일목록</h1>
      <ul>
        {completedTodos.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
export default TodoListSelector;
