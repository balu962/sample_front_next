import React, { useEffect, useState } from "react";
import type { CommentDto } from "@/types/Comment";
import { Box, List} from "@mui/material";
import axios from "axios";
import CommentPrint from "./CommentPrint";

type id = {
  postId: string;
}

const CommentList = ({ postId }: id) => {
  const [comments, setComments] = useState<CommentDto[]>([]);

    useEffect(() => {
      if(postId){
        commentList(postId);
      }
      }, [postId]);
      const commentList = async (postId: string): Promise<void> => {
        try {
          const response = await axios.get<CommentDto[]>(
            `http://localhost:8080/api/comment/list/post/${postId}`
          );
          console.log("Response:", response.data);
          setComments(response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      useEffect (()=>{

        console.log("comments 설정 확인"+comments)
      },[comments])

    return (
        <Box>
          {comments && comments.length ? (
            <Box sx={{my:3}}>
              <List>
         {comments.map((comment: CommentDto) => (
            <CommentPrint key={comment.id} oneComment={comment} />))
          }
              </List>
            </Box>
          ) : (
            <h3>작성된 댓글이 없습니다</h3>
          )}
        </Box>
    )
} 

export default CommentList;