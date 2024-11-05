import { TodoDto } from "@/types/Todo";
import { useState } from "react";

const todoUpdateSession = (updatedTodos: TodoDto) => {
    const todos = JSON.parse(sessionStorage.getItem('todos') || '[]') as TodoDto[];
    
    const index = todos.findIndex(todo => todo.id === updatedTodos.id);
    if (index !== -1) {
        todos[index] = updatedTodos; // id가 같은 항목을 덮어씌움
    } else {
        todos.push(updatedTodos); // id가 없는 항목을 추가
    }
    sessionStorage.setItem('todos', JSON.stringify(todos));
};
export default todoUpdateSession;
