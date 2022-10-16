import type { NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Bubble People</title>
        <meta name="description" content="Florence Sweeney" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen relative">
        <Header />
        <div className="h-full p-8 flex flex-col bg-background absolute">
          <h1 className="text-[48px] tracking-tight text-text-mid transition-all duration-500 mb-8 font-medium">
            Bubble People
          </h1>
        </div>
      </main>
    </div>
  );
};

export default Home;
