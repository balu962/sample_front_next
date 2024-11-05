import { TodoDto } from "@/types/Todo";
import axios from 'axios';
import dayjs from "dayjs";

const todosSet = async () => {
  const now = dayjs();
  // typeof window !== "undefined" 윈도우 참조 오류 발생시 if에 추가
    const response = await axios.get<TodoDto[]>(
      "http://localhost:8080/api/todo/all"
    );
    console.log(response.data);
    const incompleteTodos = response.data.filter((todo) => !todo.complete && dayjs(todo.dueDate) > now);
    sessionStorage.setItem("todos", JSON.stringify(incompleteTodos));
};

export default todosSet;
