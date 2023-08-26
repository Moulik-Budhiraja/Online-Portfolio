"use client";

import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import { uploadImage } from "@/serverFunctions/images2/uploadImage";
import { useState } from "react";

export default function ImageUpload() {
  const [filename, setFilename] = useState("");

  return (
    <div>
      <h1 className="font-display text-4xl text-neutral-100">Image Upload</h1>

      <form className="flex flex-col gap-4 mt-8" action={uploadImage}>
        <Input placeholder="Filename" name="filename" className="max-w-sm" />
        <div className="flex gap-4 items-center">
          <label className="font-display py-3 px-5 bg-neutral-850 border cursor-pointer border-neutral-600 rounded-md outline-none hocus:bg-neutral-700 hocus:bg-opacity-50 hocus:border-neutral-400 hocus:text-neutral-300 hocus:tracking-widest transition-all duration-300 ease-out">
            Select Image
            <input
              className="hidden"
              type="file"
              name="file"
              accept="image/*"
              required
              onChange={(e) => {
                setFilename(e.target.value.replace(/.*[\/\\]/, ""));
              }}
            />
          </label>
          <span>{filename}</span>
        </div>

        <Button className="max-w-[10rem]">Upload</Button>
      </form>
    </div>
  );
}
