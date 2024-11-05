import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import BoardPost from "../../components/board/BoardPost"

const board = () => {
    const router = useRouter();
    const { id } = router.query as {id:string};
    return (
        <Layout>
            <BoardPost boardId={id}/>
        </Layout>
    )
}

export default board;