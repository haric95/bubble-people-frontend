import React from "react";
import Image from "next/image";
import { ShopItem } from "../pages/shop";
import { Button } from "./Button";

type ShopCardProps = { item: ShopItem; direction: "left" | "right" };

export const ShopCard: React.FC<ShopCardProps> = ({ direction, item }) => {
  return (
    <div
      className={`w-full h-full border-2 border-white bg-black text-white flex opacity-[85%] hover:opacity-100 transition-all ${
        direction === "right" && "flex-row-reverse"
      } flex-col md:flex-row`}
    >
      <div
        className={`h-64 w-full md:w-64 md:h-full bg-black relative shrink-0 ${
          direction === "left" ? "md:border-r-4" : "md:border-l-4"
        } content-box border-main`}
      >
        <img
          src={item.attributes.images.data[0].attributes.url}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grow bg-black">
        <div
          className={`p-4 flex flex-col justify-between h-full ${
            direction === "left" ? "items-end text-right" : "items-start"
          }`}
        >
          <div className="mb-2 md:mb-0">
            <h4 className="font-title font-weight-500 tracking-wider mb-4">
              {item.attributes.title}
            </h4>
            <p>{item.attributes.description}</p>
          </div>
          <div
            className={`flex items-center ${
              direction === "left" && "flex-row-reverse"
            }`}
          >
            <a href={item.attributes.link} target="_blank" rel="noreferrer">
              <Button className="mr-2 text-black">Buy</Button>
            </a>
            <p className="mr-2">£{item.attributes.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
