"use server";

import { prisma } from "@/db";

export async function deleteImage(filename: string) {
  await prisma.image.delete({
    where: {
      filename: filename,
    },
  });
}
