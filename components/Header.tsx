import Link from "next/link";
import React from "react";
import { Logo } from "./Logo";

export const Header = () => {
  return (
    <header className="py-4 px-8 bg-main fixed top-0 z-50 w-full font-title tracking-wider">
      <div className="flex justify-between items-center">
        <div className="h-full w-[200px]">
          <Logo />
        </div>
        {/* <h1 className="text-[32px] tracking-tight text-text-mid transition-all duration-500 font-medium">
          Bubble People
        </h1> */}
        <div className="flex items-center text-lg">
          <Link href="/">
            <button className="mr-4 hover:text-white transition-all">
              <p>Home</p>
            </button>
          </Link>
          <Link href="/media">
            <button className="mr-4 hover:text-white transition-all">
              <p>Media</p>
            </button>
          </Link>
          <Link href="/shop">
            <button className="mr-4 hover:text-white transition-all">
              <p>Shop</p>
            </button>
          </Link>
          <Link href="/about">
            <button className="mr-4 hover:text-white transition-all">
              <p>About</p>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};
