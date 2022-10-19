import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import { fetchAPI } from "../lib/api";
import Image from "next/image";
import { getYoutubeImage } from "../lib/utils";

type MediaItem = {
  attributes: {
    title: string;
    type: "youtube" | "soundcloud" | "bandcamp";
    link: string;
  };
};

const Media = ({
  mediaItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const youtubeItems = mediaItems.filter(
    (item) => item.attributes.type === "youtube"
  );
  const bandcampItems = mediaItems.filter(
    (item) => item.attributes.type === "bandcamp"
  );
  return (
    <div>
      <Head>
        <title>Bubble People</title>
        <meta name="description" content="Bubbble People - Media" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen relative">
        <Header />
        <div>
          <main className="bg-black relative">
            <Header />
            <div className="fixed w-screen h-screen top-0 left-0 bg-black" />
            <div className="w-screen flex flex-col mt-[72px] p-8 absolute">
              <div className="mb-8">
                <>
                  <h1 className="text-white mb-4 md:font-[8px]">Recordings</h1>
                  {bandcampItems.map((item) => (
                    <div className="mb-4">
                      <iframe
                        className="border-0 w-full h-[120px]"
                        src={`https://bandcamp.com/EmbeddedPlayer/album=${item.attributes.link}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/`}
                        seamless
                      ></iframe>
                    </div>
                  ))}
                </>
              </div>
              <div>
                <h1 className="text-white mb-4">Performance</h1>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                  {youtubeItems.map((item) => (
                    <div
                      className="aspect-square bg-main relative group cursor-pointer border-2 border-white"
                      onClick={() => {
                        window.open(
                          `https://youtube.com/watch?v=${item.attributes.link}`,
                          "_blank"
                        );
                      }}
                    >
                      <Image
                        src={getYoutubeImage(item.attributes.link)}
                        layout="fill"
                        objectFit="cover"
                        className="md:blur-sm transition-all duration-500 group-hover:blur-none"
                      />
                      <div className="h-full w-full flex items-center justify-center relative text-white">
                        <h1 className="transition-all duration-500 md:opacity-0 md:translate-y-[100px] md:group-hover:translate-y-0 group-hover:opacity-100 text-[36px] sm:text-[36px] md:text-[32px] lg:text-[48px]">
                          {item.attributes.title}
                        </h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  mediaItems: MediaItem[];
}> = async () => {
  // Run API calls in parallel
  const [mediaItemRes] = await Promise.all([
    fetchAPI("/media-items", { populate: "*" }),
  ]);

  return {
    props: {
      mediaItems: mediaItemRes.data as MediaItem[],
    },
    revalidate: 1,
  };
};

export default Media;
