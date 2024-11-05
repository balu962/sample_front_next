
import Link from 'next/link';
import {Box, Button} from '@mui/material';
import { 
    useEffect, 
    useState } from 'react';
import type {PostDto, PostList} from '@/types/Post';
import PostListPrint from '../../components/post/PostListPrint'
import axios from 'axios';
import { useRouter } from 'next/router';

type id = {
    boardId: string;
}

const PostList = ({boardId}:id) => {
    const [posts, setPosts] = useState<PostDto[]>([]);
    const router = useRouter();
    const { page } = router.query as { page:string};

    useEffect(() => {
        if (boardId) {
            boardRead(boardId);
        }
    }, [boardId]);

    const boardRead = async (boardId: string) => {
        try {
            console.log(`boardId = ${boardId}`)
            {page? {page}:0}
            const response = await axios.get<PostList>(`http://localhost:8080/api/post/board/${boardId}?page=${page? page:0}`);
            setPosts(response.data.content);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };
    return (
        <Box sx={{width:"97%", mx:1 }}>
        <Box>
          <h1>모든 게시물</h1>
          {posts.length ? (
            <Box sx={{my:3}}>
             {posts.map((post: PostDto) => (
                <PostListPrint key={post.id} onePost={post} />))
              }
            </Box>
          ) : (
            <h3>게시물이 없습니다</h3>
          )}
        </Box>
        <Box sx={{position: "relative"}}>
              <Button href={`/board/${boardId}?page=1`}>
                이전 페이지
              </Button>
              <Button href={`/board/${boardId}?page=2`}>
                다음 페이지
              </Button>
          <Button href='/post/form' sx={{position: "absolute", right:"0%"}} variant="contained">
            게시물 작성
          </Button>
        </Box>
        </Box>
    )
};

export default PostList;