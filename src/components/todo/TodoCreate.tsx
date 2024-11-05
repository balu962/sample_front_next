import { TodoDto } from "@/types/Todo";
import { Box, Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import todoUpdateSession from "@/scripts/todoUpdateSession";

const TodoCreate = ({ setTodos, todos }: { setTodos: (todos: TodoDto[]) => void, todos: TodoDto[] }) => {
    const [newTodoCreate,setNewTodoCreate] = useState(false);
    const newTodoSubjectRef = useRef<HTMLInputElement | null>(null)
    const newTodoDescriptionRef = useRef<HTMLInputElement | null>(null)
    const [newTodoDueDate, setNewTodoDueDate] = useState<Dayjs|null>(dayjs());
    const router = useRouter();
    const [newTodoComplete, setNewTodoComplete] = useState(false);

    
const newTodoHandler = async () => {
    if(!(newTodoSubjectRef.current as HTMLInputElement).value.trim()){
        alert('일정 제목을 입력해주세요')
        return;
    }
    const newTodo={
        subject:(newTodoSubjectRef.current as HTMLInputElement).value,
        description:(newTodoDescriptionRef.current as HTMLInputElement).value,
        dueDate: newTodoDueDate,
        complete: newTodoComplete
    }
    try{ 
        const resNewTodo = await axios.post<TodoDto>('http://localhost:8080/api/todo/create', newTodo)
        todoUpdateSession(resNewTodo.data);
        setTodos([...todos, resNewTodo.data]);
        setNewTodoCreate(false);
        router.reload();
    } catch (error) {
        console.error('Error:', error);
    }
};

    return (
        <Box>
            {newTodoCreate?(
                <Box>
            <TextField
            fullWidth
            variant="outlined"
            inputRef={newTodoSubjectRef}
            placeholder="제목을 적어주세요(필수)"></TextField>
            <TextField
            fullWidth
            variant="outlined"
            inputRef={newTodoDescriptionRef}
            placeholder="내용을 적어주세요"></TextField>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateTimeField
          label="Uncontrolled field"
          defaultValue={newTodoDueDate}
          onChange={ (time) => setNewTodoDueDate(time)}
        />
                    </LocalizationProvider>
                        
            <FormControlLabel
                control={
                    <Checkbox
                        checked={newTodoComplete}
                        name="complete"
                        onClick={() =>setNewTodoComplete(!newTodoComplete)}
                    />
                }
                label={newTodoComplete? '완료':'미완'}
            />
            </Box>
        ):<></>
        }
  {newTodoCreate ? (<Box>
                <Button onClick={() => newTodoHandler()}>작성 완료</Button>
                <Button onClick={() => setNewTodoCreate(false)}>작성 취소</Button></Box>
            ) : (
                <Button onClick={() => setNewTodoCreate(true)}>새로운 일정</Button>
            )}
        </Box>
    )
}

export default TodoCreate;