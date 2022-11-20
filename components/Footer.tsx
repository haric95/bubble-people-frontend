import React from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaBandcamp } from "react-icons/fa";
import { ImSoundcloud } from "react-icons/im";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full left-0 p-8 flex justify-center">
      <button className="w-8 h-8 mr-4">
        <a href={"https://www.instagram.com/jasper_drifts/"} target="_blank">
          <AiOutlineInstagram color="white" className="w-full h-full" />
        </a>
      </button>
      <button className="w-8 h-8 mr-4">
        <a href={"https://bubblepeople.bandcamp.com/music"} target="_blank">
          <FaBandcamp color="white" className="w-full h-full" />
        </a>
      </button>
      <button className="w-8 h-8 mr-4">
        <a href="https://soundcloud.com/bubblepeopleofficial" target="_blank">
          <ImSoundcloud color="white" className="w-full h-full" />
        </a>
      </button>
    </div>
  );
};
