"use client";

import ImageContainer from "@/components/ImageContainer/ImageContainer";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { getImages } from "@/serverFunctions/Images/getImages";
import ConfirmationDialog from "@/components/ConfirmationDialog/ConfirmationDialog";
import LinkButton from "@/components/LinkButton/LinkButton";

export default function AdminImages() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    getImages("").then((images) =>
      setImages(images.map((image) => image.filename))
    );
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
        onSearch={(value) => {
          getImages(value).then((images) =>
            setImages(images.map((image) => image.filename))
          );
        }}
      ></SearchBar>
      <div className="mt-4 grid grid-cols-minmax-15-1fr">
        {images.map((image) => (
          <ImageContainer filename={image} alt={image}></ImageContainer>
        ))}
      </div>
    </div>
  );
}
