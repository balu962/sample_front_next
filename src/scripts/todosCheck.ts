import { TodoDto } from "@/types/Todo";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"



export const todosCheck = () => {
    const todos = JSON.parse(sessionStorage.getItem('todos') || '[]') as TodoDto[];
    const now = dayjs(); // 현재 시간 가져오기
    
    const updatedTodos = todos.filter(todo => {
        const dueDate = dayjs(todo.dueDate);
        if (dueDate.isSameOrBefore(now)) { // 현재 시간과 같을 때도 알림
            new Notification('일정 알림', {
                body: `제목: ${todo.subject}\n내용: ${todo.description}`,
                requireInteraction: true
            });

            const confirmCompletion = async () => {
                await axios.post(`http://localhost:8080/api/todo/complete/${todo.id}`);
                const updatedTodos = todos.filter(t => t.id !== todo.id);
                sessionStorage.setItem('todos', JSON.stringify(updatedTodos));
            };
            
            window.addEventListener('focus', confirmCompletion, { once: true });
            return false;
        }
        return true;
    });

    sessionStorage.setItem('todos', JSON.stringify(updatedTodos));
};

export default todosCheck;