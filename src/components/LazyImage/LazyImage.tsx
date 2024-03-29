"use client";

import { useCallback, useEffect, useRef } from "react";

type LazyImageProps = {
  filename: string;
  alt: string;
  className?: string;
  aspectRatio?: number;
  cover?: boolean;
  blur?: boolean;
  onClick?: () => void;
};

export default function LazyImage({
  filename,
  alt,
  className,
  aspectRatio,
  cover = true,
  blur = true,
  onClick,
}: LazyImageProps) {
  const fullImage = useRef<HTMLImageElement>(null);

  const unBlur = useCallback((img: HTMLImageElement) => {
    if (!blur) return;

    img?.classList.remove("opacity-0");
  }, []);

  useEffect(() => {
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
  }, [unBlur]);

  return (
    <div
      className={`relative overflow-hidden grid ${
        !cover && "place-items-center"
      } ${className || ""} `}
      style={{
        aspectRatio: aspectRatio,
      }}
      onClick={onClick}
    >
      {blur && (
        <img
          src={`/image/small/${filename}`}
          alt=""
          className={`block object-center backdrop-brightness-110 ${
            cover ? "object-cover w-full" : "object-contain w-fit"
          } grid-area-1-1-2-2 blur-md h-full`}
          style={{
            aspectRatio: aspectRatio,
          }}
        />
      )}
      <img
        src={`/image/${filename}`}
        alt={alt}
        className={`block object-center ${
          cover ? "object-cover w-full" : "object-contain w-fit"
        } grid-area-1-1-2-2 z-10 transition-all ${
          blur && "opacity-0"
        }  duration-700 ease-out h-full`}
        ref={fullImage}
        loading="lazy"
      />
    </div>
  );
}
