

import Main from "./main";
import { useRouter } from 'next/router';
import Posts from './posts';
import Layout from "@/components/Layout";


const PageRouter = () => {
  const router = useRouter();
  const { pathname } = router;

  switch (pathname) {
      case '/posts':
          return <Posts />;
      case '/main':
      default:
          return <Main />;
  }
};

export default function Home() {
  return (
    <div>
      <Layout>
          <PageRouter />
      </Layout>
    </div>
  );
}
