"use server";

import { prisma } from "@/db";
import { writeFile } from "fs/promises";
import { redirect } from "next/navigation";
import path from "path";
import sharp from "sharp";

export async function uploadImage(data: FormData) {
  const filename = data.get("filename") as string;
  const file = data.get("file") as File;

  console.log(file.type.split("/")[1]);

  // Create prisma entry
  const image = await prisma.image.create({
    data: {
      filename: filename,
      filetype: file.type.split("/")[1],
      user: {
        connect: {
          id: "913d9b8c-0523-44e9-9509-d95ff86613be", // ! Change to user id later
        },
      },
    },
  });

  if (!image) {
    throw new Error("Failed to create image");
  }

  // Write file to disk at /images/full/{id}.{filetype} and a smaller version at /images/small/{id}.{filetype}
  await writeFile(
    path.join(process.cwd(), "images", "full", `${image.id}.${image.filetype}`),
    Buffer.from(await file.arrayBuffer())
  );

  await sharp(
    path.join(process.cwd(), "images", "full", `${image.id}.${image.filetype}`)
  )
    .resize(50)
    .toFile(
      path.join(
        process.cwd(),
        "images",
        "small",
        `${image.id}.${image.filetype}`
      )
    );

  redirect("/admin/images");
}
