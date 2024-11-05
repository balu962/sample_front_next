
import {
    Box,
    TextField,
    Button
} from '@mui/material';
import {useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


const BoardCon = () => {
    const router = useRouter();

    const boardHandler = async ():Promise<void> => {
        console.log('게시판 작성 요청')
        const boardName = (document.getElementById('boardName') as HTMLInputElement).value;
        const data = {
            boardName
        };
        console.log(data);
    
        try {
            const response = await axios.post('http://localhost:8080/api/board/create', data);
            console.log('Response:', response.data);
            router.push(`/`);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <Box sx={{ mx: 4, my: 3 }}>
          <Box sx={{ width: "100%" }}>
            <TextField sx={{ width: "100%" }}
              id="boardName"
              label="게시판 이름"
              variant="outlined"
            />
          </Box>
          <Box sx = {{position: "relative"}}>
            <Button sx={{position: "absolute", right:"0%"}} variant="contained"
            onClick={boardHandler}>작성 완료</Button>
                    </Box>
        </Box>
    );
}

export default BoardCon;