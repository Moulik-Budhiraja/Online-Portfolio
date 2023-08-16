"use server";

import { prisma } from "@/db";
import { unlinkSync } from "fs";
import path from "path";

export async function deleteImage(filename: string) {
  const image = await prisma.image.delete({
    where: {
      filename: filename,
    },
  });

  // Remove from filesystem
  unlinkSync(
    path.join(process.cwd(), "images", "full", `${image.id}.${image.filetype}`)
  );

  unlinkSync(
    path.join(process.cwd(), "images", "small", `${image.id}.${image.filetype}`)
  );
}
