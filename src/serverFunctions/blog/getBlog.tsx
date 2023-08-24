"use server";

import { prisma } from "@/db";

export async function getBlog(slug: string) {
  const blog = await prisma.blog.findUnique({
    where: {
      slug: slug,
    },
    include: {
      headerImage: true,
    },
  });

  return blog;
}
