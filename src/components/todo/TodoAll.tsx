import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import type {TodoDto} from '@/types/Todo';
import { Box } from '@mui/material';
import TodoCreate from './TodoCreate';
import TodoPrint from './TodoPrint';
import todosSet from '@/scripts/todosSet';

const TodoList = () => {
    const [todos, setTodos] = useState<TodoDto[]>([]);

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get<TodoDto[]>('http://localhost:8080/api/todo/all');
            setTodos(response.data);
            console.log(response.data);
            todosSet();
        };
        fetchTodos();
    }, []);
    return (
        <Box>
            <h1>일정 리스트</h1>
            <TodoCreate setTodos={setTodos} todos={todos} />
      {todos.length ? 
      <Box sx={{ my:3}}>
      {todos.map((todo:TodoDto) => <TodoPrint key={todo.id} todo={todo}/>)}
      </Box> : (
        <p>남은 일정이 없습니다</p>
      )}
        </Box>
    );
};

export default TodoList;
