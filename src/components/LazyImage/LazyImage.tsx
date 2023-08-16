"use client";

import { useEffect, useRef } from "react";

type LazyImageProps = {
  filename: string;
  alt: string;
  className?: string;
  cover?: boolean;
  onClick?: () => void;
};

export default function LazyImage({
  filename,
  alt,
  className,
  cover = true,
  onClick,
}: LazyImageProps) {
  const fullImage = useRef<HTMLImageElement>(null);

  const unBlur = (img: HTMLImageElement) => {
    img.classList.remove("opacity-0");
  };

  useEffect(() => {
    console.log(fullImage.current?.complete);

    if (!fullImage.current) return;

    if (fullImage.current?.complete) {
      setTimeout(() => {
        unBlur(fullImage.current as HTMLImageElement);
      }, 800);
    } else {
      fullImage.current?.addEventListener("load", () => {
        setTimeout(() => {
          unBlur(fullImage.current as HTMLImageElement);
        }, 800);
      });
    }
  }, []);

  return (
    <div
      className={`relative overflow-hidden grid ${
        !cover && "place-items-center"
      } ${className || ""} `}
      onClick={onClick}
    >
      <img
        src={`/image/small/${filename}`}
        alt={alt}
        className={`w-full block object-center ${
          cover ? "object-cover" : "object-contain w-fit"
        } grid-area-1-1-2-2 blur-md h-full`}
      />
      <img
        src={`/image/${filename}`}
        alt={alt}
        className={`w-full block object-center ${
          cover ? "object-cover" : "object-contain w-fit"
        } grid-area-1-1-2-2 z-10 transition-all opacity-0  duration-700 ease-out h-full`}
        ref={fullImage}
        loading="lazy"
      />
    </div>
  );
}
