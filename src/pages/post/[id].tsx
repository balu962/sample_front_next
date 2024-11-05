
import Layout from "@/components/Layout";
import PostDetail from "../../components/post/PostDetail";
import { useRouter } from 'next/router';
import CommentListPrint from "../../components/comment/CommentListPrint"
import CommentCon from "@/components/comment/CommentCon";

const PostPage = () => {
    const router = useRouter();
    const { id } = router.query as { id: string };

    return (
        <Layout>
            <PostDetail postId={id} />
            <CommentListPrint postId={id}/>
            <CommentCon postId={id}/>
        </Layout>
    );
};

export default PostPage;