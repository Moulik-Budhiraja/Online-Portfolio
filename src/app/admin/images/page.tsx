"use client";

import ImageContainer from "@/components/ImageContainer/ImageContainer";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { getImages } from "@/serverFunctions/images/getImages";
import LinkButton from "@/components/LinkButton/LinkButton";

function updateImages(value: string, setImages: (images: string[]) => void) {
  getImages(value).then((images) =>
    setImages(images.map((image) => image.filename))
  );
}

export default function AdminImages() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    updateImages("", setImages);
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-display text-4xl text-neutral-100">
          Manage Images
        </h1>
        <LinkButton href="/admin/images/upload">Upload</LinkButton>
      </div>
      <SearchBar
        placeholder="Image Slug"
        onSearch={(value) => updateImages(value, setImages)}
      ></SearchBar>
      <div className="mt-4 grid grid-cols-minmax-15-1fr gap-4">
        {images.map((image) => (
          <ImageContainer
            key={image}
            filename={image}
            alt={image}
            refreshCallback={() => {
              updateImages("", setImages);
            }}
          ></ImageContainer>
        ))}
      </div>
    </div>
  );
}
