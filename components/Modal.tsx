import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

type VimeoModalProps = {
  vimeoUrl: string | null;
  handleClose: () => void;
};

export const VimeoModal: React.FC<VimeoModalProps> = ({
  vimeoUrl,
  handleClose,
}) => {
  const backgroundRef = useRef<null | HTMLDivElement>(null);
  const modalRef = useRef<null | HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    if (
      event.nativeEvent.target === backgroundRef.current ||
      event.nativeEvent.target === modalRef.current
    ) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed h-screen w-screen top-0 left-0 flex justify-center items-center cursor-pointer"
      ref={backgroundRef}
      onClick={handleClick}
    >
      <div
        className={`modal ${isReady ? "" : "hidden"}`}
        ref={modalRef}
        onClick={handleClick}
      >
        <div className=""></div>
      </div>
      {!isReady && <div className={`modal-placeholder`} />}
    </div>
  );
};
