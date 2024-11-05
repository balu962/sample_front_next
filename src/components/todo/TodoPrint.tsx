
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import type {TodoDto} from '@/types/Todo';
import { Box, Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import { DateTimeField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import todoUpdateSession from '@/scripts/todoUpdateSession';

type todoType = {
    todo:TodoDto
}

const TodoPrint = ({todo}:todoType) => {
    const [completed, setCompleted] = useState(todo.complete)
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const editSubjectRef = useRef<HTMLInputElement | null>(null)
    const editDescriptionRef = useRef<HTMLInputElement | null>(null)
    const [editTodoDueDate, setEditTodoDueDate] = useState<Dayjs|null>(dayjs(todo.dueDate));
    const [editTodoComplete,setEditTodoComnplete] = useState(false);

    const todoCompleteHandler = async (id:number) => {
        try{
        setCompleted(!completed)
        const resUpdateTodo = await axios.post<TodoDto>(`http://localhost:8080/api/todo/complete/${id}`);
        todoUpdateSession(resUpdateTodo.data);
    } catch (error){
        console.error(error);
    }
    }
    const todoEditStart = () => {
        setIsEditing(true);
        setEditTodoComnplete(completed);
    }

    const todoDeleteHandler = async (id:number) => {
        const confirmDelete = confirm('정말로 일정을 삭제하시겠습니까?')
        if(!confirmDelete){ return;}
        try{
            await axios.post(`http://localhost:8080/api/todo/delete/${id}`);
            router.reload;
        } catch (error){
            console.error(error);
        }
    }
    const todoModifyHandler = async (id:number) => {
        try{
            const todoEdit = {
                subject:(editSubjectRef.current as HTMLInputElement).value,
                description:(editDescriptionRef.current as HTMLInputElement).value,
                complete:editTodoComplete,
                dueDate:editTodoDueDate
            }
            const resUpdateTodo =  await axios.post<TodoDto>(`http://localhost:8080/api/todo/modify/${id}`,todoEdit);
            todoUpdateSession(resUpdateTodo.data);
            setIsEditing(false);
            router.reload();
        } catch (error){
            console.error(error);
        }
    }

    return (<Card key={todo.id} variant="outlined" sx={{ mb: 2 }}>
                {isEditing? 
                (<Box>
                <TextField
                sx = {{width:"50%"}}
                variant="outlined"
                defaultValue={todo.subject}
                inputRef={editSubjectRef}
                placeholder="제목을 적어주세요(필수)"></TextField>
                <TextField
                sx = {{width:"50%"}}
                variant="outlined"
                defaultValue={todo.description}
                inputRef={editDescriptionRef}
                placeholder="내용을 적어주세요"></TextField>
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DateTimeField
              label="Uncontrolled field"
              defaultValue={editTodoDueDate}
              onChange={ (time) => setEditTodoDueDate(time)}
            />
                        </LocalizationProvider>
                            
                <FormControlLabel
                    control={
                        <Checkbox
                        defaultChecked={completed}
                        checked={editTodoComplete}
                        onChange={()=>{setEditTodoComnplete(!editTodoComplete)}}
                            name="complete"
                        />
                    }
                    label={editTodoComplete? '완료':'미완'}
                />
                    <Button onClick={()=>setIsEditing(false)}>수정 취소</Button>
                    <Button onClick={()=>todoModifyHandler(todo.id)}>수정 완료</Button>
                
                    </Box>)
                :(<Box>
                <CardContent>
              <Typography
                gutterBottom
                sx={{ color: "#009999", fontSize: 20 }}
              >
              {dayjs(todo.dueDate).format('YYYY-MM-DD HH:mm')}
              </Typography>
              <Typography variant="h5" component="div">
                {todo.subject}
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              </Typography>
              <Typography variant="body2">{todo.description}</Typography>
            </CardContent>
            <CardActions>
            <FormControlLabel
                control={
                    <Checkbox
                        onChange={() => todoCompleteHandler(todo.id)}
                        checked={completed}
                        name="complete"
                    />
                }
                label={completed? '완료':'미완'}
            />
            <Button onClick={() => todoEditStart()} size="small">수정</Button>
            <Button onClick={()=>todoDeleteHandler(todo.id)} size="small">삭제</Button>
            </CardActions></Box>)
            }
          </Card>
      )
}

export default TodoPrint;