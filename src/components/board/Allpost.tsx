"use client";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import type { PostDto, PostList } from "@/types/Post";
import timeConvert from "@/scripts/timeConvert";
import PostListPrint from "../post/PostListPrint";
import { useRouter } from "next/router";

const Allpost = () => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const router = useRouter();
  const { page } = router.query as { page:string};

  useEffect(() => {
    postList();
  }, []);
  const postList = async (): Promise<void> => {
    console.log("모든 게시물 조회 요청");
    try {
      const response = await axios.get<PostList>(
        `http://localhost:8080/api/post/board/all?page=${page? page:0}`
      );
      console.log("Response:", response.data);
      setPosts(response.data.content);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box sx={{width:"97%", mx:1 }}>
    <Box>
      <h1>모든 게시물</h1>
      {posts.length ? (
        <Box sx={{ my:3}}>
         {posts.map((post:PostDto) => (
            <PostListPrint key={post.id} onePost={post} />))
          }
        </Box>
      ) : (
        <p>게시물이 없습니다</p>
      )}
    </Box>
    <Box sx={{position: "relative"}}>
          <Button href="/posts?page=1">
            이전 페이지
          </Button>
          <Button href="/posts?page=1">
            다음 페이지
          </Button>
      <Button href='/post/form' sx={{position: "absolute", right:"0%"}} variant="contained">
        게시물 작성
      </Button>
    </Box>
    </Box>
  );
};

export default Allpost;
