"use server";

import { prisma } from "@/db";

export async function getImages(searchTerm: string, take: number = 25) {
  const images = await prisma.image.findMany({
    where: {
      filename: {
        contains: searchTerm.replace(/ /g, "-"),
      },
    },
    take: take,
    orderBy: {
      filename: "asc",
    },
  });

  return images;
}
