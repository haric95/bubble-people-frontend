import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Image from "next/image";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaBandcamp } from "react-icons/fa";
import { ImSoundcloud } from "react-icons/im";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HTMLString, StrapiImage } from "../types";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import Link from "next/link";

type ImagesResponse = {
  data: {
    attributes: {
      HomepageImages: {
        data: StrapiImage[];
      };
    };
  };
};

type ContentResponse = {
  data: {
    attributes: {
      markup: string;
    };
  };
};

const Home = ({
  images,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <Head>
        <meta name="description" content="Bubble People" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen relative">
        <Header />
        <div
          className="w-screen flex flex-col items-center mt-[70px] absolute bg-bg-blue"
          style={{ minHeight: "calc(100vh - 70px)" }}
        >
          <div className="w-full h-auto object-fill mt-64 md:mt-0">
            <img
              src={getStrapiMedia({
                data: {
                  attributes:
                    images.data.attributes.HomepageImages.data[0].attributes,
                },
              })}
              className="w-full"
            />
            {/* <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
              className="h-full w-full"
            >
              {images.data.attributes.HomepageImages.data.map((image) => (
                <SwiperSlide>Slide 1</SwiperSlide>
              ))}
            </Swiper> */}
            <div className="fixed bottom-0 w-full left-0 p-8 flex justify-center">
              <button className="w-8 h-8 mr-4">
                <a
                  href={"https://www.instagram.com/jasper_drifts/"}
                  target="_blank"
                >
                  <AiOutlineInstagram color="white" className="w-full h-full" />
                </a>
              </button>
              <button className="w-8 h-8 mr-4">
                <a
                  href={"https://bubblepeople.bandcamp.com/music"}
                  target="_blank"
                >
                  <FaBandcamp color="white" className="w-full h-full" />
                </a>
              </button>
              <button className="w-8 h-8 mr-4">
                <a
                  href="https://soundcloud.com/bubblepeopleofficial"
                  target="_blank"
                >
                  <ImSoundcloud color="white" className="w-full h-full" />
                </a>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  images: ImagesResponse;
  content: ContentResponse;
}> = async () => {
  // Run API calls in parallel
  const [imageRes, contentRes] = await Promise.all([
    fetchAPI("/homepage-image", { populate: "*" }),
    fetchAPI("/homepage-markup", { populate: "*" }),
  ]);

  return {
    props: {
      images: imageRes,
      content: contentRes,
    },
    revalidate: 1,
  };
};

export default Home;
