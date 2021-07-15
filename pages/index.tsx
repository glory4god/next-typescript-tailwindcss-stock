import Head from 'next/head';
import Container from '../components/ui/Container';
import Slider from '../components/ui/slider';
import Button from '@material-ui/core/Button';

export default function Home() {
  return (
    <>
      <Head>
        <title>TITLE</title>
        <meta name="description" content="Generated by create next app" />
        <meta property="og:title" content="stock-title" />
        <meta name="og:description" content="Can draw charts and view news" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className=" pt-14 pb-12 px-6">
          <h2>T I T L E</h2>
          <p className="py-4">MAIN PAGE</p>
          {/* <Slider height="small" /> */}
          {/* <BottomInfo className="mt-40 mb-8" /> */}
        </div>
        <div>카카오 로그인 테스트</div>
        <Button>
          {/* <Link href="/oauth/callback/kakao">
            <a>로그인하기</a>
          </Link> */}
        </Button>
      </Container>
    </>
  );
}
