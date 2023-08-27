"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import SearchBar from "../SearchBar/SearchBar";
import { getImages } from "@/serverFunctions/image/getImages";
import { Image } from "@prisma/client";
import LazyImage from "../LazyImage/LazyImage";
import { serverLog } from "@/serverFunctions/log/serverLog";

type ImageInputProps = {
  className?: string;
  name?: string;
  defaultValue?: string;
};

export default function ImageInput({
  className,
  name,
  defaultValue,
}: ImageInputProps) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const updateImages = (searchTerm: string = "") => {
    getImages(searchTerm).then((images) => {
      setImages(images);
    });
  };

  useEffect(() => {
    updateImages();
  }, []);

  return (
    <div className="flex gap-4">
      <div className="relative">
        <Button
          type="button"
          className={`w-32 ${className ?? ""}`}
          onClick={() => setOpen(true)}
        >
          Choose
        </Button>
        <div
          className={`fixed border border-neutral-400 rounded-md bg-neutral-850 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 z-20 transition-all duration-300 ease-out ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="font-display text-neutral-100 text-3xl">
            Select Image
          </div>
          <SearchBar
            placeholder="Search Images"
            onSearch={(value) => updateImages(value)}
          ></SearchBar>
          <div className="grid grid-cols-3 gap-4 w-96 my-4 max-h-[50vh] overflow-scroll">
            {images.map((image) => (
              <LazyImage
                key={image.id}
                className="aspect-square rounded-md w-28 border border-opacity-0 border-neutral-300 hocus:border-opacity-100 cursor-pointer transition-all duration-300 ease-out"
                filename={image.filename}
                alt={image.filename}
                onClick={() => {
                  setSelectedImage(image.filename);
                  setOpen(false);
                }}
              />
            ))}
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              className="w-28"
              onClick={() => {
                setSelectedImage("");
                setOpen(false);
              }}
            >
              Clear
            </Button>
            <Button
              type="button"
              className="w-28"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
      <Input
        placeholder="Image"
        className="w-full"
        defaultValue={selectedImage ?? defaultValue}
        disabled={true}
      ></Input>
      <input type="hidden" name={name} value={selectedImage ?? defaultValue} />
    </div>
  );
}
