
import {
    Box,
    TextField,
    Button
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';

type id = {
    postId:string
}

const CommentCon = ({postId}:id) => {
    const router = useRouter();

    const commentHandler = async ():Promise<void> => {
        if(!(document.getElementById('nickname')as HTMLInputElement).value.trim() || 
        !(document.getElementById('temporaryPassword')as HTMLInputElement).value.trim()){
            alert('이름과 임시 암호는 꼭 적어주세요')
            return;
        }
        if(!(document.getElementById('content') as HTMLInputElement).value.trim()){
            alert('댓글 내용을 적어주세요')
            return;
        }
        console.log('댓글 작성 요청')
        const content = (document.getElementById('content') as HTMLInputElement).value;
        const clientInfo = JSON.parse(sessionStorage.getItem('clientInfo') as string);
        const temporaryPassword = (document.getElementById('temporaryPassword')as HTMLInputElement).value;
        const nickname = (document.getElementById('nickname')as HTMLInputElement).value;
        const ipAddress = clientInfo ? clientInfo.ip : '';
        const role = localStorage.getItem('userRole') || 'guest';
    
        const data = {
            nickname,
            temporaryPassword,
            content,
            ipAddress,
            role,
            postId
        };
        console.log(data);
    
        try {
            const response = await axios.post(`http://localhost:8080/api/comment/create/post/${postId}`, data);
            console.log('Response:', response.data);
            router.push(`/post/${postId}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <Box sx={{ mx: 4, my: 3 }}>
            <Box>
            <TextField id="nickname" label="이름"/>
            <TextField id="temporaryPassword" label="익명 댓글 암호"/>
            </Box>
          <Box sx={{ my: 3, width: "100%" }}>
            <TextField
              id="content"
              label="내용"
              multiline
              rows={1}
              placeholder="여기에 내용을 적어주세요"
              sx={{width: "100%"}}
            />
          </Box>
          <Box sx = {{position: "relative"}}>
            <Button sx={{position: "absolute", right:"0%"}} variant="contained"
            onClick={commentHandler}>작성 완료</Button>
                    </Box>
        </Box>
    );
}

export default CommentCon;