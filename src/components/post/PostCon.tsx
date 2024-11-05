import { useRef, useEffect } from 'react';
import { InputLabel, MenuItem, FormControl, Box, TextField, Button } from '@mui/material';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useRouter } from 'next/router';
import type {PostQuery} from '../../types/PostQuery';

const PostCon = () => {
    const titleRef = useRef<HTMLInputElement | null>(null);
    const contentRef = useRef<HTMLInputElement | null>(null);
    const boardIdRef = useRef<{ value: string | number } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const { id, title, content, boardId } = router.query as unknown as PostQuery;

        if (titleRef.current && contentRef.current && boardIdRef.current) {
            if (title) titleRef.current.value = title;
            if (content) contentRef.current.value = content;
            if (boardId) boardIdRef.current.value = boardId;
        }
    }, [router.query]);

    const postHandler = async () => {
        if (titleRef.current && contentRef.current && boardIdRef.current) {
          if ( !titleRef.current.value.trim() || !contentRef.current.value.trim() || !boardIdRef.current.value ) {
            alert('게시판 종류를 정해주시고, 제목, 내용을 입력해주세요')
            return;
          }
            const title = titleRef.current.value;
            const content = contentRef.current.value;
            const boardId = boardIdRef.current.value;
            const data = { title, content, boardId };
            console.log('포스트 작성 요청', data);

            try {
              const { id } = router.query as PostQuery;
              const url = id ? 
              `http://localhost:8080/api/post/${id}/modify` 
              : `http://localhost:8080/api/post/create`;

                const response = await axios.post(url, data);
                console.log('Response:', response.data);
                router.push(`/board/${boardId}`);
            } catch (error) {
                console.error('Error:', error);
            }
        } 
    }; 

    return (
        <Box sx={{ mx: 4, my: 3 }}>
            <Box sx={{ width: "100%" }}>
                <FormControl sx={{ width: "20%" }}>
                    <InputLabel id="demo-simple-select-label">게시판 선택</InputLabel>
                    <Select
                        labelId="BoardLabel"
                        id="boardId"
                        inputRef={boardIdRef}
                        label="Board"
                        defaultValue=""
                    >
                        <MenuItem value={1}>공지사항</MenuItem>
                        <MenuItem value={2}>잡담</MenuItem>
                        <MenuItem value={3}>개발 이야기</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    inputRef={titleRef}
                    sx={{ width: "80%" }}
                    id="title"
                    label="제목"
                    variant="outlined"
                />
            </Box>
            <Box sx={{ my: 3, width: "100%" }}>
                <TextField
                    inputRef={contentRef}
                    id="content"
                    label="내용"
                    multiline
                    rows={5}
                    placeholder="여기에 내용을 적어주세요"
                    sx={{ width: "100%" }}
                />
            </Box>
            <Box sx={{ position: "relative" }}>
                <Button sx={{ position: "absolute", right: "0%" }} variant="contained" onClick={postHandler}>
                    작성 완료
                </Button>
            </Box>
        </Box>
    );
};

export default PostCon;
