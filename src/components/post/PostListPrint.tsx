
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import type { PostDto, PostList } from "@/types/Post";
import timeConvert from "@/scripts/timeConvert";

type postType = {
  onePost:PostDto
}

export default function PostList ({onePost}:postType){
console.log(onePost.id);
return(
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography
          gutterBottom
          sx={{ color: "text.secondary", fontSize: 14 }}
        >
          {timeConvert(onePost.createDate)}
        </Typography>
        <Typography variant="h5" component="div">
          {onePost.title}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
        </Typography>
        <Typography variant="body2">{onePost.content}</Typography>
      </CardContent>
      <CardActions>
        <Button href={`/post/${onePost.id}`} size="small">자세히 보기</Button>
      </CardActions>
    </Card>
  )
}