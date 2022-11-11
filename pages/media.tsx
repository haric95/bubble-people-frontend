import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import { fetchAPI } from "../lib/api";
import Image from "next/image";
import { getYoutubeImage } from "../lib/utils";
import ReactPlayer from "react-player";
import React, { useRef, useState } from "react";
import {
  IoMdPlay,
  IoMdPause,
  IoMdSkipForward,
  IoMdSkipBackward,
} from "react-icons/io";
import { Button } from "../components/Button";
import { StrapiImage } from "../types";

declare global {
  interface Window {
    SC: any;
  }
}

type MediaVideoItem = {
  attributes: {
    title: string;
    thumbnail: StrapiImage;
    link: string;
    index: number;
  };
};

type MediaAudioItem = {
  attributes: {
    Title: string;
    Artist: string;
    Album: string;
    HostLink: string;
    BandcampLink: string;
    Cover: { data: StrapiImage };
    Index: number;
  };
};

const Media = ({
  videoItems,
  audioItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const playerRef = useRef<ReactPlayer | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [seekTime, setSeekTime] = useState(0);
  const [playIndex, setPlayIndex] = useState(0);

  console.log(audioItems);

  return (
    <div>
      <Head>
        <title>Bubble People</title>
        <meta name="description" content="Bubbble People - Media" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen relative">
        <Header />
        <div className="fixed w-screen h-screen top-0 left-0 bg-bg-blue" />
        <div
          className="w-screen flex flex-col mt-[70px] p-8 absolute"
          style={{ minHeight: "calc(100vh - 70px)" }}
        >
          <div className="mb-8">
            <>
              <h1 className="font-title text-glow-heading text-main-glow mb-4 md:font-[8px]">
                recordings
              </h1>
            </>
            <ReactPlayer
              key={playIndex}
              ref={playerRef}
              url={audioItems[playIndex].attributes.HostLink}
              width="100%"
              height="0px"
              playing={isPlaying}
              onProgress={(time) => setSeekTime(time.playedSeconds)}
              onDuration={(duration) => setDuration(duration)}
              onEnded={() => {
                setSeekTime(0);
                if (playIndex + 1 < audioItems.length) {
                  setPlayIndex((old) => old + 1);
                } else {
                  setPlayIndex(0);
                  setIsPlaying(false);
                }
              }}
            />
            <div className="w-full h-fit md:w-[640px] md:h-[130px]">
              <div className="w-full h-full flex flex-col md:flex-row items-stretch bg-white p-2">
                <Button
                  className="relative aspect-square h-full flex items-center justify-center shrink-0"
                  onClick={() => {
                    setIsPlaying((old) => !old);
                  }}
                >
                  {audioItems[playIndex].attributes.Cover.data && (
                    <Image
                      src={
                        audioItems[playIndex].attributes.Cover.data.attributes
                          .url
                      }
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                </Button>
                <div className="flex flex-col justify-between h-full md:ml-2 w-full">
                  <p className="text-xl">
                    {audioItems[playIndex].attributes.Title} -{" "}
                    {audioItems[playIndex].attributes.Artist}
                  </p>
                  <p>
                    {playIndex + 1} / {audioItems.length}
                  </p>
                  <div className="flex w-full justify-between mb-2">
                    <Button
                      className="!p-0 w-8 h-8 flex items-center justify-center shrink-0 mr-4"
                      onClick={() => {
                        setIsPlaying((old) => !old);
                      }}
                    >
                      {isPlaying ? <IoMdPause /> : <IoMdPlay />}
                    </Button>
                    <div className="flex justify-end">
                      <Button
                        className="!p-0 w-8 h-8 flex items-center justify-center shrink-0 mr-4"
                        onClick={() => {
                          setSeekTime(0);
                          setDuration(null);
                          setPlayIndex(
                            (old) =>
                              (old - 1 + audioItems.length) % audioItems.length
                          );
                        }}
                      >
                        <IoMdSkipBackward className="" />
                      </Button>
                      <Button
                        className="!p-0 w-8 h-8 flex items-center justify-center shrink-0"
                        onClick={() => {
                          setSeekTime(0);
                          setDuration(null);
                          setPlayIndex((old) => (old + 1) % audioItems.length);
                        }}
                      >
                        <IoMdSkipForward className="" />
                      </Button>
                    </div>
                  </div>
                  <div className="w-full">
                    <div
                      className="h-2 w-full bg-bg-blue relative cursor-pointer"
                      ref={barRef}
                      onClick={(e) => {
                        if (barRef.current) {
                          const boundingRect =
                            barRef.current.getBoundingClientRect();
                          const clickPercentage =
                            (e.clientX - boundingRect.left) /
                            boundingRect.width;
                          duration && setSeekTime(duration * clickPercentage);
                          playerRef.current?.seekTo(clickPercentage);
                        }
                      }}
                    >
                      <div
                        className={`h-full absolute bg-button`}
                        style={{
                          width: duration
                            ? `${(seekTime / duration) * 100}%`
                            : 0,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-title text-glow-heading text-main-glow mb-4">
              video
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {videoItems.map((item) => (
                <div
                  className="aspect-square bg-main relative group cursor-pointer border-2 border-white"
                  onClick={() => {
                    window.open(item.attributes.link, "_blank");
                  }}
                >
                  <Image
                    src={getYoutubeImage(item.attributes.link)}
                    layout="fill"
                    objectFit="cover"
                    className="md:blur-sm transition-all duration-500 group-hover:blur-none"
                  />
                  <div className="h-full w-full flex items-center justify-center relative text-glow-heading text-white">
                    <h1 className="transition-all duration-500 text-glow md:opacity-0 md:translate-y-[100px] md:group-hover:translate-y-0 group-hover:opacity-100 text-[36px] sm:text-[36px] md:text-[32px] lg:text-[48px]">
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
  );
};

export const getStaticProps: GetStaticProps<{
  videoItems: MediaVideoItem[];
  audioItems: MediaAudioItem[];
}> = async () => {
  // Run API calls in parallel
  const [videoItemsRes, audioItemsRes] = await Promise.all([
    fetchAPI("/media-items", { populate: "*" }),
    fetchAPI("/media-audio-items", { populate: "*" }),
  ]);

  return {
    props: {
      videoItems: videoItemsRes.data as MediaVideoItem[],
      audioItems: audioItemsRes.data as MediaAudioItem[],
    },
    revalidate: 1,
  };
};

export default Media;
