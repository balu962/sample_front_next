
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PostDto } from '@/types/Post';
import { Box, Button, Paper } from '@mui/material';
import timeConvert from '@/scripts/timeConvert';
import { useRouter } from 'next/router';

type id = {
    postId: string;
}

const PostDetail = ({ postId }: id) => {
    const router = useRouter();
    const [post, setPost] = useState<PostDto|null>(null);

    useEffect(() => {
        if (postId) {
            postRead(postId);
        }
    }, [postId]);

    const postRead = async (postId: string) => {
        try {
            const response = await axios.get<PostDto>(`http://localhost:8080/api/post/${postId}`);
            setPost(response.data);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    if (!post) {
        return <p>로딩 중</p>;
    }
    const postModifyHandler = () =>{
        router.push({
            pathname: '/post/form',
            query: { id: post.id, title: post.title, content: post.content, boardId:post.boardId }
        });
    };
    const postDeleteHandler = async () => {
        const confirmDelete = confirm('정말로 글을 삭제하시겠습니까?')
        if(!confirmDelete){
            return;
        }
        try {
            const response = await axios.post<PostDto>(`http://localhost:8080/api/post/${postId}/delete`);
            router.push(`/posts`)
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

    return (
        <Box>
        <Box>
            <h1>게시물 상세 보기</h1>
            <Paper variant="outlined" sx={{ mx:1, my:1, width:'97%'}}>
            <h3>{post.title}</h3>
            <span>{timeConvert(post.createDate)}</span>
            <p>{post.content}</p>
            </Paper>
        </Box>
        <Box>
        <Button onClick={postModifyHandler} sx={{bgcolor:'#01DF3A', color:'white'}}>글 수정</Button>
        <Button onClick={postDeleteHandler} sx={{bgcolor:'#B40404', color:'white'}}>글 삭제</Button>
        </Box>
        </Box>
    );
}

export default PostDetail;

