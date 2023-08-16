"use client";

import { useEffect, useRef } from "react";

type LazyImageProps = {
  filename: string;
  alt: string;
  className?: string;
};

export default function LazyImage({
  filename,
  alt,
  className,
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
      }, 100);
    } else {
      fullImage.current?.addEventListener("load", () => {
        unBlur(fullImage.current as HTMLImageElement);
      });
    }
  }, []);

  return (
    <div className={`${className} relative overflow-hidden grid`}>
      <img
        src={`/image/small/${filename}`}
        alt={alt}
        className="w-full block object-center object-cover grid-area-1-1-2-2 blur-md h-full"
      />
      <img
        src={`/image/${filename}`}
        alt={alt}
        className="w-full block object-center object-cover grid-area-1-1-2-2 z-10 opacity-0 transition-opacity duration-500 ease-out h-full"
        ref={fullImage}
        loading="lazy"
      />
    </div>
  );
}
