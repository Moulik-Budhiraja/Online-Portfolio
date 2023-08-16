"use server";

import { prisma } from "@/db";

export async function editImage(filename: string, newFilename: string) {
  await prisma.image.update({
    where: {
      filename,
    },
    data: {
      filename: newFilename,
    },
  });
}
