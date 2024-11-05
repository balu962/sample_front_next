// Navbar.tsx
'use client'
import {
    AppBar, 
    Button, 
    Toolbar, 
    Typography
} from '@mui/material';
import {
    useEffect
} from 'react';
import axios from 'axios'
import {getClientInfo} from '../../scripts/getClientInfo'
import todosSet from '@/scripts/todosSet';
import todosCheck from '@/scripts/todosCheck';

const Navbar = () =>{

    useEffect(() => {
        getClientInfo();
        if (!sessionStorage.getItem("todos")) {
        todosSet();
        }
        const todoInterval = setInterval(todosCheck, 60*1000); // 1분 주기
        return () => clearInterval(todoInterval); //컴포넌트 언마운트시 인터벌 종료, 메모리 누수 방지
    }, []);

    return(
        <>
        <AppBar sx={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: '#01DFD7' }}>
            <Toolbar>
                <Typography variant="h6">상단 바</Typography>
                
          <Button color="inherit">로그인</Button>
          <Button href="/todo/list" color="inherit">내 일정</Button>
            </Toolbar>
        </AppBar>
        </>
    )
}

export default Navbar;