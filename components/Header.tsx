import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <div className="p-8 bg-main">
      <div className="flex justify-between items-center">
        <h1 className="text-[32px] tracking-tight text-text-mid transition-all duration-500 font-medium">
          Bubble People
        </h1>
        <div className="flex items-center">
          <Link href="/">
            <button className="mr-4">
              <p>Home</p>
            </button>
          </Link>
          <Link href="/media">
            <button className="mr-4">
              <p>Media</p>
            </button>
          </Link>
          <a
            href="https://bubblepeople.bandcamp.com/merch"
            target="_blank"
            rel="noreferrer"
            className="mr-4"
          >
            <p>Store</p>
          </a>
          <Link href="/about">
            <button className="mr-4">
              <p>About</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
