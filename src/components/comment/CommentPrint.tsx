
import type {  CommentDto } from "@/types/Comment";
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, TextField, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import timeConvert from "@/scripts/timeConvert";

type Comment = {
    oneComment:CommentDto
}

 const CommentPrint = ({oneComment}:Comment) =>{
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const editContentRef = useRef<HTMLInputElement | null>(null)


  const commentModifyHandler = async (commentId:number):Promise<void> => {
    if (!(editContentRef.current as HTMLInputElement).value.trim()){
      alert('내용을 입력해주세요')
      return;
    }
    try {
      await axios.post<CommentDto>(
        `http://localhost:8080/api/comment/modify/${commentId}`,
        { content: (editContentRef.current as HTMLInputElement).value }
    );
    setIsEditing(false);
      router.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const commentDeleteHandler = async (commentId:number) => {
    const confirmDelete = confirm('정말로 댓글을 삭제하시겠습니까?')
    if(!confirmDelete){ return;}
  try {
    const response = await axios.post<void>(`http://localhost:8080/api/comment/delete/${commentId}`);
    router.reload();
  } catch (error) {
    console.error("Error:", error);
  }
}

    return (
      <>
      <ListItem alignItems="flex-start">
    <ListItemAvatar>
      <Avatar src="/images/mushroom-8313142.jpg" />
    </ListItemAvatar>
    {isEditing ? (
                  <TextField
                  fullWidth
                  variant="outlined"
                  defaultValue={oneComment.content}
                  inputRef={editContentRef}
                  placeholder="댓글 내용을 수정하세요"
                  />
                ) : (
                    <ListItemText
                    primary={oneComment.nickname}
                    secondary={
                      <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.primary', display: 'inline', mr:4}}
                        >
                      {oneComment.content}
                      </Typography>
                      {timeConvert(oneComment.createDate)}
                      </React.Fragment>
                      }
                    />
                  )}
  </ListItem>
  <Box sx={{mx:3}}>
  {isEditing ? (
                <Button onClick={() => commentModifyHandler(oneComment.id)} value="수정 완료">수정 완료</Button>
            ) : (
                <Button onClick={() => setIsEditing(true)} value="수정">수정</Button>
            )}
    <Button onClick={()=>commentDeleteHandler(oneComment.id)}>삭제</Button>
    </Box>
  <Divider variant="inset" component="li" />
      </>
    )
  }

  export default CommentPrint;