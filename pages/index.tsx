import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { Header } from "../components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HTMLString, StrapiImage } from "../types";
import { fetchAPI } from "../lib/api";

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
  console.log(images);
  return (
    <div>
      <Head>
        <meta name="description" content="Bubble People" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen relative">
        <Header />
        <div className="fixed w-screen h-screen top-0 left-0 bg-white"></div>
        <div className="w-screen flex flex-col mt-[70px] p-8 absolute">
          <div className="w-full md:h-screen">
            <Swiper
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
              {/* {images.map((image) => (
                <SwiperSlide>Slide 1</SwiperSlide>
              ))} */}
            </Swiper>
          </div>
        </div>
        <div className="h-full p-8 flex flex-col bg-background absolute"></div>
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
