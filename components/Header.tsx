import Link from "next/link";
import React from "react";
import { Logo } from "./Logo";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="py-4 px-8 bg-main fixed top-0 z-50 w-full font-title tracking-wider">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="h-full w-[120px] mb-2 md:w-[180px] md:mb-0">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center text-lg">
          <Link href="/">
            <button
              className={`mr-4 hover:text-white transition-all text-[24px] ${
                router.asPath === "/" ? "text-white" : ""
              }`}
            >
              Home
            </button>
          </Link>
          <Link href="/media">
            <button
              className={`mr-4 hover:text-white transition-all text-[24px] ${
                router.asPath === "/" ? "text-white" : ""
              }`}
            >
              Media
            </button>
          </Link>
          <Link href="/shop">
            <button
              className={`mr-4 hover:text-white transition-all text-[24px] ${
                router.asPath === "/" ? "text-white" : ""
              }`}
            >
              Shop
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
