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
import { Footer } from "../components/Footer";

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

const Home = ({ images }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<{
  images: ImagesResponse;
}> = async () => {
  // Run API calls in parallel
  const [imageRes] = await Promise.all([
    fetchAPI("/homepage-image", { populate: "*" }),
  ]);

  return {
    props: {
      images: imageRes,
    },
    revalidate: 1,
  };
};

export default Home;
